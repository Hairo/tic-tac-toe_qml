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

import QtQuick 2.0

// The line that crosses the items when someone wins, called WinLine in here

Item {
    z: 100
    SequentialAnimation {
        running: true
        NumberAnimation { target: parent; property: "scale"; to: 2; duration: 80 }
        NumberAnimation { target: parent; property: "scale"; to: 1; duration: 80 }
    }
    Rectangle {
        id: icenter
        anchors.centerIn: parent
        anchors.verticalCenter: parent.verticalCenter
        }

    Rectangle {
        height: units.gu(1)
        width: units.gu(43)
        color: "dimgray"
        anchors.left: icenter.right
        anchors.leftMargin: units.gu(-7.5)
        anchors.verticalCenter: icenter.verticalCenter
    }
}
