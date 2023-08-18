const seeds = function (server) {
  /* addresses ---------------------*/
  server.create("address", {
    id: "ad-1",
    addressLineOne: "Street 123 ",
    addressLineTwo: "Building ITPQ",
    pinCode: "xyz",
    state: "abc",
  });
  server.create("address", {
    id: "ad-2",
    addressLineOne: "Street 1",
    addressLineTwo: "Building IT",
    pinCode: "xyz",
    state: "abc",
  });
  server.create("address", {
    id: "ad-3",
    addressLineOne: "Street 22",
    addressLineTwo: "Building TT",
    pinCode: "xyz",
    state: "abc",
  });
  server.create("address", {
    id: "ad-4",
    addressLineOne: "Street 100",
    addressLineTwo: "Building ITL",
    pinCode: "xyz",
    state: "abc",
  });
  /* users ---------------------*/
  server.create("user", {
    id: 1,
    addresses: [
      server.schema.addresses.find("ad-1"),
      server.schema.addresses.find("ad-4"),
    ],
    name: "Jhon",
    email: "jhon@gmail.com",
  });
  server.create("user", {
    id: 2,
    addresses: [server.schema.addresses.find("ad-2")],
    name: "Anne",
    email: "Anne@gmail.com",
  });
  server.create("user", {
    id: 3,
    addresses: [server.schema.addresses.find("ad-1")],
    name: "Sam",
    email: "Sam@gmail.com",
  });
  server.create("user", {
    id: 4,
    addresses: [server.schema.addresses.find("ad-3")],
    name: "Tom",
    email: "Tom@gmail.com",
  });
};
export default seeds;
