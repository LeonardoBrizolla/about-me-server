const express = require('express');
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
});

server.get("/about", function(req, res) {
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/34755142?v=4",
        name: "Leonardo Brizolla",
        role: 'Aluno - <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>',
        description: "Programador full-stack, focado na qualidade de desenvolvimento de software",
        links: [
            { name: "Github", url: "https://github.com/LeonardoBrizolla/" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/leonardo-brizolla/" },
            { name: "Twitter", url: "https://twitter.com/leobrizaa/" },
        ],
    }

    return res.render("about", { about });
});

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos });
});

server.get("/video", function(req, res) {
    const id = req.query.id;

    const video = videos.find(function(video) {
        return video.id == id;
    })

    if (!video) {
        return res.send("Video not found!");
    }

    return res.render("Video", { item: video })
});

server.listen(5000, function() {
    console.log("Server is running 🟢 ");
});