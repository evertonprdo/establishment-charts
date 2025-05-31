use dotenv::dotenv;
use dotenv_codegen::dotenv;

use establishment_charts::{
    queries::{
        distinct_states::DistinctStates,
        establishments_amount_by::{EstablishmentsAmountBy, EstablishmentsAmountByParams},
    },
    repository::{ConnectionParams, Database},
};

use rocket::{
    State,
    fs::FileServer,
    get,
    http::{self, Status},
    launch, routes,
    serde::json::Json,
};
use rocket_cors::CorsOptions;

#[launch]
async fn rocket() -> _ {
    dotenv().ok();

    let connection_params = ConnectionParams {
        host: dotenv!("HOST"),
        user: dotenv!("USER"),
        password: dotenv!("PASSWORD"),
        dbname: dotenv!("DBNAME"),
    };

    let database = Database::new(connection_params)
        .await
        .expect("Something goes wrong!");

    rocket::build()
        .attach(CorsOptions::default().to_cors().unwrap())
        .manage(database)
        .mount("/", FileServer::from(dotenv!("STATIC_FILES_PATH")))
        .mount("/establishments", routes![amount_by])
        .mount("/addresses", routes![distinct_states])
}

#[get("/distinct-states")]
async fn distinct_states(
    database: &State<Database>,
) -> Result<Json<Vec<DistinctStates>>, http::Status> {
    match DistinctStates::execute(database).await {
        Ok(states) => Ok(Json(states)),
        Err(err) => {
            eprintln!("[ERROR]: {err}");
            Err(Status::InternalServerError)
        }
    }
}

#[get("/amount-by?<request..>")]
async fn amount_by(
    db: &State<Database>,
    request: EstablishmentsAmountByParams<'_>,
) -> Result<Json<EstablishmentsAmountBy>, http::Status> {
    match EstablishmentsAmountBy::execute(db, request).await {
        Ok(result) => Ok(Json(result)),
        Err(err) => {
            eprintln!("[ERROR]: {err}");
            Err(Status::InternalServerError)
        }
    }
}
