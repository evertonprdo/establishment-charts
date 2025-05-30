pub struct Point {
    pub latitude: f64,
    pub longitude: f64,
}

pub struct Establishment<'a> {
    pub id: i64,
    pub name: &'a str,
    pub address: &'a str,
    pub location: Point,
    pub total_stars: i32,
    pub total_reviews: i32,
    pub schedules_amount: i32,
}
