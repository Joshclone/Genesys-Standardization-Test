const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, name: 'Kyle', role: ROLE.ADMIN },
    { id: 2, name: 'Sally', role: ROLE.BASIC },
    { id: 3, name: 'Joe', role: ROLE.BASIC }
  ],
  transfers: [
    { id: 1, name: "Kyle's transfer", userId: 1 },
    { id: 2, name: "Sally's transfer", userId: 2 },
    { id: 3, name: "Sauce Code's transfer", userId: 3 },
    { id: 4, name: "Jude Joel's transfer", userId: 4 },
    { id: 5, name: "Joshua Ben's transfer", userId: 5 },
    { id: 6, name: "Apah Daniel's transfer", userId: 6 },
    { id: 7, name: "Benjamin's transfer", userId: 7 }
  ]
}