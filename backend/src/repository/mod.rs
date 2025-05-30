use std::error::Error;

use postgres::{Client, NoTls, types::ToSql};

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
    client: Client,
}
impl Database {
    pub fn new(params: ConnectionParams) -> Result<Self, Box<dyn Error>> {
        let conn_str = params.format_connection_string();
        let client = Client::connect(&conn_str, NoTls)?;

        Ok(Database { client })
    }

    pub fn foo(&mut self, query: &str, params: &[&(dyn ToSql + Sync)]) {
        self.client.execute(query, params).unwrap();
    }
}
