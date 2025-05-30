use std::error::Error;

use rocket::serde;
use serde::Serialize;

use crate::repository::Database;

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LocationAmount {
    name: String,
    amount: i64,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct EstablishmentsAmountBy {
    locations: Vec<LocationAmount>,
    total: i64,
}
impl EstablishmentsAmountBy {
    const QUERY: &str = include_str!("establishments_amount_by.sql");

    fn validate_field<'a>(field: &'a str) -> Option<&'a str> {
        match field {
            "state" | "city" => Some(field),
            _ => None,
        }
    }

    pub async fn execute(
        db: &Database,
        field: &str,
        min_schedules: i32,
    ) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let validated_field = Self::validate_field(field).ok_or("Invalid field name")?;

        let query = Self::QUERY.replace("{ field }", validated_field);
        let rows = db.client().query(&query, &[&min_schedules]).await?;

        let mut locations = Vec::with_capacity(rows.len());
        let mut total = 0;

        for row in rows {
            let location = LocationAmount {
                name: row.get("name"),
                amount: row.get("amount"),
            };

            total += location.amount;
            locations.push(location);
        }

        Ok(Self { locations, total })
    }
}
