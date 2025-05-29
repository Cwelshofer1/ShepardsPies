



export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <>
    <Routes>
      <Route path="/">
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
    </>
  );
}
