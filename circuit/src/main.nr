fn main(x: Field) {
    assert(x == get_test_value_wrapper());
}

#[oracle(get_storage)]
unconstrained fn get_test_value() -> Field {}

unconstrained fn get_test_value_wrapper() -> Field {
    get_test_value()
}

#[test]
fn test_main() {
    let test_value = get_test_value_wrapper();
    main(1);
    // Uncomment to make test fail
    // main(1, 1);
}
