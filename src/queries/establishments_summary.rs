use std::error::Error;

use serde::Serialize;

use crate::repository::Database;

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct EstablishmentsSummary {
    establishments: i64,
    total_schedules: i64,
    max_schedule: i32,
    schedules_avg: f64,
}
impl EstablishmentsSummary {
    const QUERY: &str = include_str!("establishments_summary.sql");

    pub async fn execute(db: &Database) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let row = db.client().query_one(Self::QUERY, &[]).await?;
        let summary = Self {
            establishments: row.get("establishments"),
            total_schedules: row.get("total_schedules"),
            max_schedule: row.get("max_schedule"),
            schedules_avg: row.get("schedules_avg"),
        };

        Ok(summary)
    }
}
