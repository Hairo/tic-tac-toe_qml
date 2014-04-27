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
 * lp:~hairocr8/+junk/Tic-Tac-Toe
 *
 */

import QtQuick 2.0
import QtQuick.LocalStorage 2.0 as Sql
import Ubuntu.Components 0.1
import Ubuntu.Components.ListItems 0.1 as ListItem
import Ubuntu.Components.Popups 0.1

import "items"
import "js/itemCreation.js" as SetItem
import "js/matchOperations.js" as MatchOp
import "js/settingsOperations.js" as SettOP

MainView {
    objectName: "Mainview"
    applicationName: "Tic-Tac-Toe"
    id: root
    width: units.gu(50)
    height: units.gu(75)

    //Mode selecting dialog, used to select between 2 and 1 players mode
    Component {
        id: mode_dialog
        Dialog {
            id: dialogue
            title: "Tic-Tac-Toe"
            text: "Select mode:"
            Button {
                text: "1 player (vs. CPU)"
                color: "pink"
                onClicked: {
                    MatchOp.setGameMode("1p");
                    PopupUtils.close(dialogue);
                }
            }
            Button {
                text: "2 players (vs. another player)"
                color: "lightblue"
                onClicked: {
                    MatchOp.setGameMode("2p");
                    PopupUtils.close(dialogue);
                }
            }
            Button {
                text: "Quit"
                onClicked: {
                    Qt.quit();
                }
            }
        }
    }

    // Timer for mode_dialog to be displayed after app start
    Timer {
        id: startt
        interval: 50;
        onTriggered: PopupUtils.open(mode_dialog, firstPage)
    }

    Tabs {
        id: tabs
        anchors.fill: parent

        // First tab, used for the game itself
        Tab {
            id: tab1
            objectName: "Tab1"
            title: i18n.tr("Tic-Tac-Toe")

            page: Page {
                id: firstPage
                anchors.margins: units.gu(2)
                Component.onCompleted: {
                    startt.start()
                }

                tools: ToolbarActions {
                    //Test button, used for testing new functions, will be removed or commented in the release
//                    Action {
//                        id: testtest
//                        objectName: "test_button"
//                        text: i18n.tr("Test")
//                        onTriggered: {
//                            MatchOp.aiEasyModeMove()
//                        }
//                    }

                    // Mode toogle button
                    Action {
                        id: mode_toogle
                        objectName: "m_toogle"
                        text: i18n.tr("Mode")
                        onTriggered: {
                            PopupUtils.open(mode_dialog, mode_toogle.itemHint)
                        }
                    }

                    Action {
                        objectName: "newgame_button"
                        text: i18n.tr("New Game")
                        onTriggered: {
                            MatchOp.startNewGame()
                            firstPage.tools.active = false
                        }
                    }

                    back {
                        visible: true
                        onTriggered: Qt.quit();
                    }
                }




                Row {
                    id:nextrow
                    anchors.left: parent.left
                    anchors.bottom: bighash.top
                    anchors.bottomMargin: units.gu(26)

                    Label {
                        id: nextlabel
                        text: "Next:"
                        fontSize: "x-large"
                        onTextChanged: {
                            text_animation.start()
                        }
                        SequentialAnimation {
                            id: text_animation
                            NumberAnimation { target: nextlabel; property: "scale"; to: 2; duration: 80 }
                            NumberAnimation { target: nextlabel; property: "scale"; to: 1; duration: 80 }
                        }
                    }

                    Item {
                        id: currentitem
                        transform: Scale { xScale: 0.5; yScale: 0.5}
                        anchors.left: nextlabel.right
                        anchors.leftMargin: units.gu(4)
                        anchors.verticalCenter: nextlabel.verticalCenter
                        Component.onCompleted: {
                            // try to create the default database for settings and stats if it's not present,
                            // set the starting item from db and draw it.
                            try {
                                SettOP.createDefaultDB()
                            } catch (e) { }
                            SettOP.setStartItem()
                            SetItem.createItemObjects(SettOP.getCurrentItem(), currentitem)
                            }
                    }
                }

                BigHash {
                    id:bighash
                    anchors.centerIn: parent
                    anchors.verticalCenterOffset: units.gu(3)
                }

                /* Game board, indexes by id are:
                 a1 | a2 | a3
                --------------
                 b1 | b2 | b3
                --------------
                 c1 | c2 | c3  */
                Grid {
                    anchors.centerIn: bighash
                    columns: 3
                    rows: 3
                    spacing: units.gu(2)

                    Rectangle {
                        id: a1
                        width: units.gu(12)
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("a1");
                            }

                        }

                    }

                    Rectangle {
                        id: a2
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("a2");
                            }
                        }

                    }

                    Rectangle {
                        id: a3
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("a3");
                            }
                        }

                    }

                    Rectangle {
                        id: b1
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("b1");
                            }
                        }

                    }

                    Rectangle {
                        id: b2
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("b2");
                            }
                        }

                    }

                    Rectangle {
                        id: b3
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("b3");
                            }
                        }

                    }

                    Rectangle {
                        id: c1
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("c1");
                            }
                        }

                    }

                    Rectangle {
                        id: c2
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("c2");
                            }
                        }

                    }

                    Rectangle {
                        id: c3
                        width: a1.width
                        height: width
                        color: "transparent"

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                MatchOp.playerMove("c3");
                            }
                        }

                    }

                    // Timer for ai to play
                    Timer {
                        id: nextt
                        interval: 300;
                        onTriggered: MatchOp.aiEasyModeMove()
                    }
                }
            }

        } // Tab

        // Second Tab, used for displaying the stats
        Tab {
            objectName: "Tab2"

            title: i18n.tr("Stats")
            page: Page {
                id: secondPage
                anchors.margins: units.gu(2)

                Column {
                    anchors.topMargin: units.gu(3)
                    anchors.fill: parent

                    ListItem.Header {
                        text: i18n.tr("Matches:")
                    }

                    ListItem.SingleValue {
                        id: matches
                        text: i18n.tr("Played Matches")
                        value: i18n.tr(parseInt(cross_wins.value)+parseInt(nought_wins.value)+parseInt(draws_counter.value))
                        showDivider: false
                        enabled: false
                    }

                    ListItem.Divider {}

                    ListItem.Header {
                        text: i18n.tr("Wins:")
                    }

                    ListItem.SingleValue {
                        id: cross_wins
                        text: i18n.tr("=")
                        value: i18n.tr("0")
                        enabled: false
                        icon: Rectangle {
                            anchors.margins: units.dp(5)
                            width: height
                            color: "transparent"
                            Cross {
                                anchors.centerIn: parent
                                scale: 0.45
                            }
                        }
                        Component.onCompleted: {
                            // Reads the stats from db and set it to cross_wins, used for calculating the matches
                            var db = SettOP.initDB()
                            db.transaction( function(tx) {
                                try {
                                    var si = tx.executeSql('SELECT cwins FROM Settings').rows.item(0).cwins;
                                    cross_wins.value = i18n.tr(si)
                                } catch (e) {}
                            });
                        }
                    }

                    ListItem.SingleValue {
                        id: nought_wins
                        text: i18n.tr("=")
                        value: i18n.tr("0")
                        showDivider: false
                        enabled: false
                        icon: Rectangle {
                            anchors.margins: units.dp(5)
                            width: height
                            color: "transparent"
                            Nought {
                                anchors.centerIn: parent
                                scale: 0.45
                            }
                        }
                        Component.onCompleted: {
                            // Reads the stats from db and set it to nought_wins, used for calculating the matches
                            var db = SettOP.initDB()
                            db.transaction( function(tx) {
                                try {
                                    var si = tx.executeSql('SELECT nwins FROM Settings').rows.item(0).nwins;
                                    nought_wins.value = i18n.tr(si)
                                } catch (e) {}
                            });
                        }
                    }

                    ListItem.Divider {}

                    ListItem.Header {
                        text: i18n.tr("Draws:")
                    }

                    ListItem.SingleValue {
                        id: draws_counter
                        text: i18n.tr("=")
                        value: i18n.tr("0")
                        showDivider: false
                        enabled: false
                        icon: Rectangle {
                            anchors.margins: units.dp(5)
                            width: height*2
                            color: "transparent"
                            Nought {
                                anchors.verticalCenter: parent.verticalCenter
                                anchors.horizontalCenter: parent.horizontalCenter
                                anchors.horizontalCenterOffset: units.gu(-2.5)
                                scale: 0.45
                            }
                            Cross {
                                anchors.verticalCenter: parent.verticalCenter
                                anchors.horizontalCenter: parent.horizontalCenter
                                anchors.horizontalCenterOffset: units.gu(2.5)
                                scale: 0.45
                            }
                        }
                        Component.onCompleted: {
                            // Reads the stats from db and set it to draws_counter, used for calculating the matches
                            var db = SettOP.initDB()
                            db.transaction( function(tx) {
                                try {
                                    var si = tx.executeSql('SELECT draws FROM Settings').rows.item(0).draws;
                                    draws_counter.value = i18n.tr(si)
                                } catch (e) {}
                            });
                        }
                    }

                    ListItem.Divider {}

                    ListItem.SingleControl {
                        control: Button {
                            id: reset_button
                            text: i18n.tr("Reset values")
                            anchors.margins: units.gu(1)
                            anchors.fill: parent
                            onClicked: {
                                PopupUtils.open(reset_dialog, reset_button)
                            }
                        }
                    }

                    Component {
                        id: reset_dialog
                        Dialog {
                            id: resdial
                            title: "Are you sure?"
                            text: "This will set all the values to 0"
                            Button {
                                text: "Yes"
                                color: "red"
                                onClicked: {
                                    SettOP.resetStats()
                                    PopupUtils.close(resdial)
                                }
                            }
                            Button {
                                text: "No"
                                onClicked: PopupUtils.close(resdial)
                            }
                        }
                    }

                }

            }
        } //Tab

        // Third tab, used for settings
        Tab {
            objectName: "Tab3"

            title: i18n.tr("Settings")
            page: Page {
                id: thirdPage
                anchors.margins: units.gu(2)

                Column {
                    anchors.topMargin: units.gu(3)
                    anchors.fill: parent

                    ListItem.Header {
                        text: i18n.tr("Match:")
                    }

                    ListItem.ValueSelector {
                        id: sitemselector
                        text: i18n.tr("Match start item")
                        values: [i18n.tr("Cross"), i18n.tr("Nought")]
                        showDivider: false
                        Component.onCompleted: {
                            //Reads the setting value from the db and set it to sitemselector
                            var db = SettOP.initDB()
                            db.transaction( function(tx) {
                                try {
                                    var si = tx.executeSql('SELECT sitem FROM Settings').rows.item(0).sitem;

                                    if (si === "cross") {
                                        sitemselector.selectedIndex = 0
                                    } else if (si === "nought") {
                                        sitemselector.selectedIndex = 1
                                    }
                                } catch (e) {}
                            });
                        }
                        onSelectedIndexChanged: {
                            //Writes the setting value to the db
                            if (sitemselector.selectedIndex === 0) {
                                SettOP.writeSettingsToDB("sitem", "cross")
                            } else if (sitemselector.selectedIndex === 1) {
                                SettOP.writeSettingsToDB("sitem", "nought")
                            }
                        }
                    }
                }
            }
        }
    }
}
