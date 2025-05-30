use std::{error::Error, sync::Arc, time::Duration};

use rocket::tokio::{self, time};
use tokio_postgres::{Client, NoTls};

pub struct ConnectionParams<'a> {
    pub host: &'a str,
    pub user: &'a str,
    pub password: &'a str,
    pub dbname: &'a str,
}
impl<'a> ConnectionParams<'a> {
    fn format_connection_string(&self) -> String {
        format!(
            "host={} user={} password={} dbname={}",
            self.host, self.user, self.password, self.dbname
        )
    }
}

pub struct Database {
    client: Arc<Client>,
}
impl Database {
    pub async fn new<'a>(params: ConnectionParams<'a>) -> Result<Self, Box<dyn Error>> {
        let conn_str = params.format_connection_string();
        let (client, connection) = tokio_postgres::connect(&conn_str, NoTls).await?;

        let client = Arc::new(client);

        tokio::spawn(async move {
            if let Err(e) = connection.await {
                eprintln!("connection error: {}", e);
            }
        });

        let ka_client = client.clone();
        tokio::spawn(async move {
            let mut interval = time::interval(Duration::from_secs(60));
            loop {
                interval.tick().await;
                let _ = ka_client.simple_query("SELECT 1").await;
            }
        });

        Ok(Database { client })
    }

    pub(crate) fn client(&self) -> &Client {
        &self.client
    }
}
