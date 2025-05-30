use rocket::serde;
use serde::Serialize;
use tokio_postgres::types::{FromSql, IsNull, ToSql, Type};

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Establishment {
    pub id: i64,
    pub name: String,
    pub address: String,
    pub location: Option<Point>,
    pub total_stars: i32,
    pub total_reviews: i32,
    pub schedules_amount: i32,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Address {
    pub establish_id: i64,
    pub city: String,
    pub immediate_region: String,
    pub metropolitan_region: Option<String>,
    pub intermediate_region: String,
    pub state: String,
    pub macro_region: String,
    pub postal_code: Option<String>,
    pub country: String,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Point {
    pub latitude: f64,
    pub longitude: f64,
}
impl<'a> FromSql<'a> for Point {
    fn accepts(ty: &Type) -> bool {
        *ty == Type::POINT
    }

    fn from_sql(
        ty: &Type,
        raw: &'a [u8],
    ) -> Result<Self, Box<dyn std::error::Error + Sync + Send>> {
        if !<Point as FromSql>::accepts(ty) {
            return Err("wrong type".into());
        }

        if raw.len() != 16 {
            return Err(format!("invalid POINT: expected 16 bytes, got {}", raw.len()).into());
        }

        let lat = f64::from_be_bytes(raw[0..8].try_into()?);
        let lon = f64::from_be_bytes(raw[8..16].try_into()?);

        Ok(Point {
            latitude: lat,
            longitude: lon,
        })
    }
}
impl ToSql for Point {
    fn accepts(ty: &Type) -> bool
    where
        Self: Sized,
    {
        *ty == Type::POINT
    }

    fn to_sql(
        &self,
        ty: &Type,
        out: &mut tokio_postgres::types::private::BytesMut,
    ) -> Result<IsNull, Box<dyn std::error::Error + Sync + Send>>
    where
        Self: Sized,
    {
        if !<Point as ToSql>::accepts(ty) {
            return Err(format!("cannot encode Point as {:?}", ty).into());
        }

        out.reserve(16);

        out.extend_from_slice(&self.latitude.to_be_bytes());
        out.extend_from_slice(&self.longitude.to_be_bytes());

        Ok(IsNull::No)
    }

    fn to_sql_checked(
        &self,
        ty: &Type,
        out: &mut tokio_postgres::types::private::BytesMut,
    ) -> Result<IsNull, Box<dyn std::error::Error + Sync + Send>> {
        if !<Point as ToSql>::accepts(ty) {
            return Err(format!("invalid type for Point: {:?}", ty).into());
        }

        self.to_sql(ty, out)
    }
}
