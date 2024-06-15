import http from "node:http";
const server = http.createServer((req, res) => {
    const { url, method } = req;
    if(url === "/" && method === "GET") {
        return res.end(
            JSON.stringify({
                status: 200,
                body: "Bem vindo(a) a home!",
            })
        );
    }

    res.statusCode = 404;
    return res.end(
        JSON.stringify({
            status: 200,
            body: "Bem vindo(a) a home com o method = POST",
        })
    );
});

server.listen(3000, () => {
    console.log("Funcionu!");
});