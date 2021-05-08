async function handler(req, res) {
  if (req.method === "POST") {
    const { isLogin, email, password, returnSecureToken, changePwd } = req.body;
    const processType = changePwd
      ? "update"
      : isLogin
      ? "signInWithPassword"
      : "signUp";
    console.log(processType);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${processType}?key=AIzaSyDEnXFbshker5Olr0956buPRDcbGY7HxjU`;

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
          : { message: "Account is successfully created." }
      );
  }
}

export default handler;
