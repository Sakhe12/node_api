const sql = require("./db");

//constructor
const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created tutorial: ", { id: res.insertID, ...newTutorial });
        result(null, { id: res.insertId, ...newTutorial});

    });
};

Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
          }

          //not found Tut with the id
          result({ kind: "not_found" }, null);
        });
};


Tutorial.getALL = (title, result) => {
    let query = "SELECT * FROM tuts";

    if (title) {
        query += `Where title like '%${title}%`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          console.log("tutorials: ", res);
          result(null, res);
    });
};

Tutorial.getALLPublished = result => {
    sql.query("select * from tuts where published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          console.log("tutorials: ", res);
          result(null, res);
    });
};

Tutorial.updateById = (id, tutorial, result) => {
    sql.query(
        "update tutorials set title = ?, description = ?, published = ? where id = ?"
        [tutorial.title, tutorial.description, tutorial.published, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          if (res.affectedRows == 0) {
            //not found tut with the id
            result({ kind: "not_found" }, null);
            return;
          }

          console.log("update tutorial: ", { id: id, ...tutorial });
          result(null, { id: id, ...tutorial});
        });
};

Tutorial.remove = (id, result) => {
    sql.query("delete from tutorials where id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows) {
            // not found tut with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};

Tutorial.removeAll = result => {
    sql.query("delete from tutorials", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = Tutorial;

