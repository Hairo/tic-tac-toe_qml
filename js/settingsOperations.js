/*
 * Copyright (C) 2013 Hairo R. Carela
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Hairo R. Carela <hairocr8@gmail.com>
 */

.import QtQuick.LocalStorage 2.0 as Sql

//Used to innitializa the db operations.
function initDB() {
    return(Sql.LocalStorage.openDatabaseSync("SettingsDB", "1.0", "Settings and stats for tic-tac-toe", 100));
}

//Creates the default database with the default values.
function createDefaultDB() {
    var db = initDB()
    db.transaction( function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Settings (id INTEGRER PRIMARY KEY, sitem TEXT, cwins INTEGRER, nwins INTEGRER, draws INTEGRER)');
        tx.executeSql('CREATE UNIQUE INDEX IF NOT EXISTS sindex ON Settings (id, sitem, cwins, nwins, draws)');
        tx.executeSql('INSERT INTO Settings (id, sitem, cwins, nwins, draws) VALUES (1, "cross", 0, 0, 0)');
    });
}

var next_turn;

// Set the starting item based on the value from the db
function setStartItem() {
    var db = initDB()
    db.transaction( function(tx) {
        var si = tx.executeSql('SELECT sitem FROM Settings').rows.item(0).sitem;
        next_turn = si;
    });
}

function getCurrentItem() {
    return(next_turn);
}

// Identifies if the item on the next label is either a cross or
// a nought by checking the color of its children.
function getItemFromNextLabel () {
    if (currentitem.children[0].children[0].color == "#ffffff") {
        next_turn = "cross"
        return("cross")
    } else if (currentitem.children[0].children[0].color == "#000000") {
        next_turn = "nought"
        return("nought")
    }
}

// Sets the item used in the next turn
function setNextTurnItem() {
    currentitem.children[0].destroy()

    if (next_turn === "cross") {
        next_turn = "nought";
    } else if (next_turn === "nought") {
        next_turn = "cross";
    }
}

// Write settings into the database
function writeSettingsToDB(col, value) {
    var db = initDB()
    db.transaction( function(tx) {
        tx.executeSql('UPDATE Settings SET '+col+'="'+value+'" WHERE id=1');
    });
}

// Adds a point in the stats and db to the winner of the match or to the draws counter.
function addStatsPoints (item) {
    var db = initDB()
    db.transaction( function(tx) {
        if (item === "cross") {
            tx.executeSql('UPDATE Settings SET cwins=cwins+1 WHERE id=1');
            cross_wins.value = i18n.tr(parseInt(cross_wins.value)+1)
        } else if (item === "nought") {
            tx.executeSql('UPDATE Settings SET nwins=nwins+1 WHERE id=1');
            nought_wins.value = i18n.tr(parseInt(nought_wins.value)+1)
        } else if (item === "draw") {
            tx.executeSql('UPDATE Settings SET draws=draws+1 WHERE id=1');
            draws_counter.value = i18n.tr(parseInt(draws_counter.value)+1)
        }

//        var rs = tx.executeSql('SELECT * FROM Settings');

//        var r = ""
//        for(var i = 0; i < rs.rows.length; i++) {
//            r += rs.rows.item(i).sitem + ", " + rs.rows.item(i).cwins + ", " + rs.rows.item(i).nwins + ", " + rs.rows.item(i).draws + "\n"
//        }
//        console.log(r)
    });
}

// Sets all the values on the db and stats tab to 0
function resetStats() {
    var db = initDB()
    db.transaction( function(tx) {
        try {
            tx.executeSql('UPDATE Settings SET cwins=0 WHERE id=1');
            tx.executeSql('UPDATE Settings SET nwins=0 WHERE id=1');
            tx.executeSql('UPDATE Settings SET draws=0 WHERE id=1');
            cross_wins.value = i18n.tr("0")
            nought_wins.value = i18n.tr("0")
            draws_counter.value = i18n.tr("0")
        } catch (e) {}
    });
}
