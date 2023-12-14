fn main(x: Field, y: pub Field) {
    assert(x != y);
}

#[foreign_call(get_storage)]
unconstrained fn get_test_value() -> Field {
    2
}

unconstrained fn get_test_value_wrapper() -> Field {
    get_test_value()
}

#[test]
fn test_main() {
    let test_value = get_test_value_wrapper();
    main(1, test_value);
    // Uncomment to make test fail
    // main(1, 1);
}
