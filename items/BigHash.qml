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

// Game board, referred here as BigHash

Item {
    Rectangle{
        id: icenter
        anchors.centerIn: parent
        }

    Rectangle{
        id:hlin1
        height: units.gu(0.2)
        width: units.gu(41)
        color: "darkgray"
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottom: icenter.top
        anchors.bottomMargin: units.gu(7)
        }

    Rectangle{
        id: hlin2
        height: hlin1.height
        width: hlin1.width
        color: "darkgray"
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: icenter.bottom
        anchors.topMargin: units.gu(7)
        }

    Rectangle{
        id: vlin1
        height: hlin1.width
        width: hlin1.height
        color: "darkgray"
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: icenter.right
        anchors.leftMargin: units.gu(7)
        }

    Rectangle{
        id: vlin2
        height: hlin1.width
        width: hlin1.height
        color: "darkgray"
        anchors.verticalCenter: parent.verticalCenter
        anchors.right: icenter.left
        anchors.rightMargin: units.gu(7)
        }
}
