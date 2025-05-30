use backend::repository::{ConnectionParams, Database};
use dotenv::dotenv;
use dotenv_codegen::dotenv;

fn main() {
    dotenv().ok();

    let connection_params = ConnectionParams {
        host: dotenv!("HOST"),
        user: dotenv!("USER"),
        password: dotenv!("PASSWORD"),
        dbname: dotenv!("DBNAME"),
    };

    let mut database = Database::new(connection_params).expect("Something goes wrong!");
    database.foo("SELECT * FROM establishment", &[]);
}
