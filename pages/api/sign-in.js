async function handler(req, res) {
  if (req.method === "POST") {
    const { isLogin, email, password, returnSecureToken } = req.body;
    console.log(isLogin, email, password, returnSecureToken);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
      isLogin ? "signInWithPassword" : "signUp"
    }?key=AIzaSyDEnXFbshker5Olr0956buPRDcbGY7HxjU`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: returnSecureToken,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    console.log(data.error.message);
    if (!response.ok) {
      let errorMsg = "Authentication Failed";
      if (!isLogin && data && data.error && data.error.message)
        errorMsg = data.error.message.replace(/_/g, " ").toLowerCase();
      res.status(400).json({ error: { code: 400, message: errorMsg } });
      return;
    }

    res
      .status(200)
      .json(
        isLogin
          ? { expiresIn: data.expiresIn, idToken: data.idToken }
          : "Account is successfully created"
      );
  }
}

export default handler;
