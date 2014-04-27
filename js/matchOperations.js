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

.import "settingsOperations.js" as SettOP
Qt.include("itemCreation.js")

/* Main grid of the game, the property is the corresponding index in the game board
 and the value is an array consisting of two values 1) a boolean that
 determines if the index is being used by an item (cross or nought) and
 2) a string (0 as default) that determines what is using that index (either a cross or a nought)  */
var matchgrid = {
    a1:[false, 0], a2:[false, 0], a3:[false, 0],
    b1:[false, 0], b2:[false, 0], b3:[false, 0],
    c1:[false, 0], c2:[false, 0], c3:[false, 0]};

/* Checks if someone won using checkWhoWon() and sets the values in the matchgrid
   object, needs the grid index (index) and the item that will be set (value) being
   a cross or nought. */
function matchGridSwitch(index, value) {
    var val = 0;
    if (checkWhoWon() === false) {
        if (matchgrid[index][0] === true) {
            var val = true;
        } else if (matchgrid[index][0] === false) {
            matchgrid[index][0] = true;
            matchgrid[index][1] = value;
            var val = false;
        }
    }
    return(val)
}

var game_mode = "";

function setGameMode (mode) {
    game_mode = mode
}

// Checks if someone (and who) won the match and creates the winning lines
function checkWhoWon () {
    if (matchgrid["a1"][1] === "cross" && matchgrid["a2"][1] === "cross" && matchgrid["a3"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", a3, 180)
        console.log("cross won at a1+a2+a3");
        return(true);
    } else if (matchgrid["b1"][1] === "cross" && matchgrid["b2"][1] === "cross" && matchgrid["b3"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", b3, 180)
        console.log("cross won at b1+b2+b3");
        return(true);
    } else if (matchgrid["c1"][1] === "cross" && matchgrid["c2"][1] === "cross" && matchgrid["c3"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", c3, 180)
        console.log("cross won at c1+c2+c3");
        return(true);
    } else if (matchgrid["a1"][1] === "cross" && matchgrid["b1"][1] === "cross" && matchgrid["c1"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", c1, 270)
        console.log("cross won at a1+b1+c1");
        return(true);
    } else if (matchgrid["a2"][1] === "cross" && matchgrid["b2"][1] === "cross" && matchgrid["c2"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", c2, 270)
        console.log("cross won at a2+b2+c2");
        return(true);
    } else if (matchgrid["a3"][1] === "cross" && matchgrid["b3"][1] === "cross" && matchgrid["c3"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", c3, 270)
        console.log("cross won at a3+b3+c3");
        return(true);
    } else if (matchgrid["a1"][1] === "cross" && matchgrid["b2"][1] === "cross" && matchgrid["c3"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", a1, 45)
        createItemObjects("winline", c3, 225)
        console.log("cross won at a1+b2+c3");
        return(true);
    } else if (matchgrid["a3"][1] === "cross" && matchgrid["b2"][1] === "cross" && matchgrid["c1"][1] === "cross") {
        setWinnerLabel("cross");
        SettOP.addStatsPoints("cross")
        createItemObjects("winline", a3, 135)
        createItemObjects("winline", c1, 315)
        console.log("cross won at a3+b2+c1");
        return(true);
    } else if (matchgrid["a1"][1] === "nought" && matchgrid["a2"][1] === "nought" && matchgrid["a3"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", a3, 180)
        console.log("nought won at a1+a2+a3");
        return(true);
    } else if (matchgrid["b1"][1] === "nought" && matchgrid["b2"][1] === "nought" && matchgrid["b3"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", b3, 180)
        console.log("nought won at b1+b2+b3");
        return(true);
    } else if (matchgrid["c1"][1] === "nought" && matchgrid["c2"][1] === "nought" && matchgrid["c3"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", c3, 180)
        console.log("nought won at c1+c2+c3");
        return(true);
    } else if (matchgrid["a1"][1] === "nought" && matchgrid["b1"][1] === "nought" && matchgrid["c1"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", c1, 270)
        console.log("nought won at a1+b1+c1");
        return(true);
    } else if (matchgrid["a2"][1] === "nought" && matchgrid["b2"][1] === "nought" && matchgrid["c2"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", c2, 270)
        console.log("nought won at a2+b2+c2");
        return(true);
    } else if (matchgrid["a3"][1] === "nought" && matchgrid["b3"][1] === "nought" && matchgrid["c3"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", c3, 270)
        console.log("nought won at a3+b3+c3");
        return(true);
    } else if (matchgrid["a1"][1] === "nought" && matchgrid["b2"][1] === "nought" && matchgrid["c3"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", a1, 45)
        createItemObjects("winline", c3, 225)
        console.log("nought won at a1+b2+c3,");
        return(true);
    } else if (matchgrid["a3"][1] === "nought" && matchgrid["b2"][1] === "nought" && matchgrid["c1"][1] === "nought") {
        setWinnerLabel("nought");
        SettOP.addStatsPoints("nought")
        createItemObjects("winline", a3, 135)
        createItemObjects("winline", c1, 315)
        console.log("nought won at a3+b2+c1");
        return(true);
    } else if (checkIfDraw() === true) {
        // This checks for a draw, and changes the next label if so.
        nextlabel.text = "Draw...";
        SettOP.addStatsPoints("draw")
        currentitem.children[1].destroy();
        firstPage.tools.active = true
        console.log("draw");
        return(true);
    } else {
        return(false);
    }
}

// Change the "next" label to "won" and draws the winner item determined by checkWhoWon()
function setWinnerLabel (who) {
    try {
        nextlabel.text = "Won:";
        currentitem.children[1].destroy();
        createItemObjects(who, currentitem);
        firstPage.tools.active = true

    } catch (e) {
        //do noting
    }
}

var keys = Object.keys(matchgrid)

/* Checks if a tie was achieved by using the keys of the matchgrid and +1 for
   each used index or -1 for each unused one, if the result is 9
   (all used) and no one has won then a draw is called. */
function checkIfDraw () {
    var ch = 0;

    for (var i=0;i<9;i++) {
            if (matchgrid[keys[i]][0] === true) {
                ch += 1;
            } else if (matchgrid[keys[i]][0] === false) {
                ch -= 1;
            }
        }
    if (ch === 9) {
        return(true);
    } else {
        return(false);
    }
}

/* Manages player interaction, draws the item in the grid and calls all the required
 functions to set the values in the match grid. needs the index where it will be
 draw (grid_item). */
function playerMove(grid_item) {

    // converts the string given (grid_item) into an object id
    switch (grid_item) {
    case "a1":
        var grid_index = a1;
        break;
    case "a2":
        var grid_index = a2;
        break;
    case "a3":
        var grid_index = a3;
        break;
    case "b1":
        var grid_index = b1;
        break;
    case "b2":
        var grid_index = b2;
        break;
    case "b3":
        var grid_index = b3;
        break;
    case "c1":
        var grid_index = c1;
        break;
    case "c2":
        var grid_index = c2;
        break;
    case "c3":
        var grid_index = c3;
        break;
    }

    if (matchGridSwitch(grid_item, SettOP.getItemFromNextLabel()) === false || 0) {
        createItemObjects(SettOP.getItemFromNextLabel(), grid_index)
        SettOP.setNextTurnItem()
        createItemObjects(SettOP.getCurrentItem(), currentitem)
//        checkWhoWon()
        if (checkWhoWon() === false && game_mode === "1p") {
            nextt.start()
        }
    }

    console.log(grid_item);
}

// Is called by the new game button to reset the match grid object and destroy
// all the items in the board.
function startNewGame () {
    var grid_array = [a1, a2, a3, b1, b2, b3, c1, c2, c3]

    nextlabel.text = "Next:";
    SettOP.setStartItem();

    try {
        currentitem.children[0].destroy();
    } catch (e) {
        //do nothing :)
    }

    createItemObjects(SettOP.getCurrentItem(), currentitem)

    for (var i=0; i<grid_array.length; i++) {
        try {
            matchgrid[keys[i]][0] = false;
            matchgrid[keys[i]][1] = 0;
            for (var y=1; y<grid_array[i].children.length; y++) {
                grid_array[i].children[y].destroy()
            }
        } catch (e) {
            //do nothing
        }
    }

//    for (var k in matchgrid) {
//        if (matchgrid.hasOwnProperty(k)) {
//            console.log('key is: ' + k + ', value is: ' + matchgrid[k]);
//        }
//    }
}

// Main Ai component, checks what indexes are empty in the match grid object and returns them in an array.
function aiCheck () {
    var ai_array = [];

    for (var k in matchgrid) {
        if (matchgrid.hasOwnProperty(k)) {
            if (matchgrid[k][0] === false) {
                ai_array.push(k);
            }
        }
    }

    return(ai_array);
}

// Ai first mode (easy), uses the empty indexes provided by aiCheck() and sets an item in a random one.
function aiEasyModeMove() {
    var rand = aiCheck()[Math.floor(Math.random() * aiCheck().length)]

    // converts the random string given (rand) into an object id
    switch (rand) {
    case "a1":
        var rand_index = a1;
        break;
    case "a2":
        var rand_index = a2;
        break;
    case "a3":
        var rand_index = a3;
        break;
    case "b1":
        var rand_index = b1;
        break;
    case "b2":
        var rand_index = b2;
        break;
    case "b3":
        var rand_index = b3;
        break;
    case "c1":
        var rand_index = c1;
        break;
    case "c2":
        var rand_index = c2;
        break;
    case "c3":
        var rand_index = c3;
        break;
    }

    if (matchGridSwitch(rand, SettOP.getItemFromNextLabel()) === false || 0) {
        createItemObjects(SettOP.getItemFromNextLabel(), rand_index)
        SettOP.setNextTurnItem()
        createItemObjects(SettOP.getCurrentItem(), currentitem)
        checkWhoWon()
    }

    console.log(rand);
}
