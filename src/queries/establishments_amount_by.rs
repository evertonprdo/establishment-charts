use std::error::Error;

use rocket::{FromForm, serde};
use serde::Serialize;

use crate::repository::Database;

#[derive(FromForm)]
pub struct EstablishmentsAmountByParams<'r> {
    column: &'r str,
    min_schedules: Option<u32>,
    limit: Option<u32>,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LocationAmount {
    name: String,
    amount: i64,
    schedules_amount: i64,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct EstablishmentsAmountBy {
    locations: Vec<LocationAmount>,
    total: i64,
}
impl EstablishmentsAmountBy {
    const QUERY: &str = include_str!("establishments_amount_by.sql");

    fn validate_column<'a>(column: &'a str) -> Option<&'a str> {
        match column {
            "state" | "city" | "macro_region" | "immediate_region" | "intermediate_region" => {
                Some(column)
            }
            _ => None,
        }
    }

    pub async fn execute(
        db: &Database,
        params: EstablishmentsAmountByParams<'_>,
    ) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let validated_field = Self::validate_column(params.column).ok_or("Invalid column name")?;
        let min_schedules = params
            .min_schedules
            .map(|n| i32::try_from(n).unwrap_or(i32::MAX))
            .unwrap_or(0);

        let limit_clause = match params.limit {
            Some(limit) => format!("LIMIT {limit}"),
            None => "".to_string(),
        };
        let query = Self::QUERY
            .replace("{ column }", validated_field)
            .replace("{ limit_clause }", &limit_clause);

        let rows = db.client().query(&query, &[&min_schedules]).await?;

        let mut locations = Vec::with_capacity(rows.len());
        let mut total = 0;

        for row in rows {
            let location = LocationAmount {
                name: row.get("name"),
                amount: row.get("amount"),
                schedules_amount: row.get("schedules_amount"),
            };

            total += location.amount;
            locations.push(location);
        }

        Ok(Self { locations, total })
    }
}
