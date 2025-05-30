use std::error::Error;

use serde::Serialize;

use crate::repository::Database;

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct DistinctStates {
    name: String,
}
impl DistinctStates {
    const QUERY: &str = include_str!("distinct_states.sql");

    pub async fn execute(
        db: &Database,
    ) -> Result<Vec<DistinctStates>, Box<dyn Error + Send + Sync>> {
        let rows = db.client().query(Self::QUERY, &[]).await?;

        let results = rows
            .into_iter()
            .map(|row| Self {
                name: row.get("state"),
            })
            .collect();

        Ok(results)
    }
}
