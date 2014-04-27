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

var component;
var sprite;

// Item creation function, needs the name of the item (item),
// where is going to be created (index)
// and the angle that if not defined is set to 0 by default

function createItemObjects(item, index, angle) {
    if(typeof angle === "undefined") {
        angle = 0
    }

    if (item === "cross") {
        var val = "../items/Cross.qml";
    } else if (item === "nought") {
        var val = "../items/Nought.qml";
    } else if (item === "winline") {
        var val = "../items/WinLine.qml";
    }

    component = Qt.createComponent(val);
    sprite = component.createObject(index, {"anchors.centerIn": index,
                                            "rotation": angle
                                            });

    if (sprite === null) {
        // Error Handling
        console.log("Error creating object");
    }
}
