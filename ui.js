/*
Ethereal Farm
Copyright (C) 2020-2023  Lode Vandevenne

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// tab contents
var fieldFlex;
var upgradeFlex;
var fruitFlex;
var medalDiv;
var field2Flex;
var field3Flex;
var upgrade2Flex;
var automatonFlex;
var squirrelFlex;
var amberFlex;


var mainw;
var mainh;

var topFlex;
var infoFlex;
var tabFlex;
var contentFlex;
var shortcutFlex;
var logFlexBegin;
var logFlex;
var goalFlex;

var medalFlex;

var mainFlex = null; // takes width of entire screen, not of the actual game
var gameFlex = null; // anything in this one becomes inactive during modal dialog
var topDialogFlex = null; // has exactly same size as gameFlex, but can contain elements even during modal dialogs (and the modal dialogs themselves)
var nonDialogFlex = null;

var rightFlex;
var topRightFlex;
var bottomRightFlex;

window.onresize = function() {
  if(mainFlex) mainFlex.update();
};

function makeMainDivs() {
  var showdebugborders = false;

  var has_top_notice = !!document.getElementById('topnotice');

  if(mainFlex) mainFlex.removeSelf(null);
  mainFlex = new Flex(null, 0, 0, 1, 1);
  nonDialogFlex = new Flex(mainFlex, 0, 0, 1, 1);

  gameFlex = new Flex(nonDialogFlex, [0, 0, 0.01, 0.75], has_top_notice ? 0.03 : 0.01, [0, 0, 0.99, 0.75], 0.99);
  if(showdebugborders) gameFlex.div.style.border = '2px solid green';
  //gameFlex.div.style.border = '2px solid black';
  //gameFlex.div.style.backgroundColor = '#0001';

  topDialogFlex = new Flex(mainFlex, [0, 0, 0.01, 0.75], has_top_notice ? 0.03 : 0.01, [0, 0, 0.99, 0.75], 0.99);
  topDialogFlex.div.style.visibility = 'hidden';

  topFlex = new Flex(gameFlex, 0, 0, 1, 0.05);
  if(showdebugborders) topFlex.div.style.border = '2px solid red';

  infoFlex = new Flex(gameFlex, 0, 0.05, 1, 0.17);
  if(showdebugborders) infoFlex.div.style.border = '2px solid blue';

  tabFlex = new Flex(gameFlex, 0, 0.171, 1, 0.29);
  if(showdebugborders) tabFlex.div.style.border = '2px solid green';

  //contentDiv = makeDiv(0, 0, 0, 0, document.body);
  contentFlex = new Flex(gameFlex, 0, 0.2925, 1, 0.7925);
  if(showdebugborders) contentFlex.div.style.border = '2px solid orange';
  //contentFlex.div.style.backgroundColor = '#0004';

  shortcutFlex = new Flex(gameFlex, 0, 0.795, 1, 0.825);
  if(showdebugborders) shortcutFlex.div.style.border = '2px solid gray';

  logFlexBegin = 0.83;
  logFlex = new Flex(gameFlex, 0, logFlexBegin, 1, 1);
  if(showdebugborders) logFlex.div.style.border = '2px solid gray';

  goalFlex = new Flex(gameFlex, 0, 0.795, 1, 0.825);
  if(showdebugborders) goalFlex.div.style.border = '2px solid yellow';
  goalFlex.div.style.visibility = 'hidden';
  goalFlex.div.className = 'efGoal';

  // have right pane follow same vertical size rules as the left part for good alignment
  rightFlex = new Flex(nonDialogFlex, [0, 0, 0.99, 0.75], has_top_notice ? 0.03 : 0.01, [0, 0, 0.99, 1.1], 0.99);
  rightFlex.div.style.visibility = 'hidden';
  rightFlex.div.style.overflow = 'hidden'; // avoid creating unwanted global scrollbars
  //rightFlex.div.style.border = '4px solid red';
  topRightFlex = new Flex(rightFlex, 0.02, 0.05, 0.98, 0.25, FONT_SMALL);
  bottomRightFlex = new Flex(rightFlex, 0.02, 0.25, 0.98, 1);
  topRightFlex.div.className = 'efBordered';
  topRightFlex.div.style.padding = '1%';
  bottomRightFlex.div.className = 'efBordered';
  topRightFlex.div.style.borderBottom = 'none';
  bottomRightFlex.div.style.borderTop = 'none';

  mainFlex.attachTo(document.body);
  mainFlex.update();
}



// UI that persists even through loading of savegame, hard resets, etc...
function initUIGlobal() {
  makeMainDivs();
  initMessageUI();
  initSettingsUI();
}



var tabindex_field;
var tabindex_upgrades;
var tabindex_fruit;
var tabindex_field2;
var tabindex_upgrades2;
var tabindex_field3;
var tabindex_automaton;
var tabindex_squirrel;
var tabindex_amber;
var tabindex_medals;

// init the UI after a reset, save load, .... Keeps log messages
// assume state is already correctly initialized
// NOTE: nothing in here may depend on prefield
function initUI() {
  //topDiv.innerHTML = '';
  //tabDiv.innerHTML = '';
  //contentDiv.innerHTML = '';
  //logDiv.innerHTML = '';
  removeAllArrows();

  setStyle();

  document.body.className = 'efBackground';

  contentFlex.clear();
  pausedflex = undefined;
  pausedbuttoncanvasstate = -1;
  pausedflextext = undefined;
  tabFlex.clear();

  //setMainDivSizes();

  tabbuttons = [];
  tabs = [];

  // this determines the unique id of each tab (used in savegame) but not the display order. The display order is determined in ui_tabs.js in updateTabButtons.
  var tabnum = 0;
  tabindex_field = tabnum++;
  tabindex_upgrades = tabnum++;
  tabindex_fruit = tabnum++;
  tabindex_field2 = tabnum++;
  tabindex_upgrades2 = tabnum++;
  tabindex_field3 = tabnum++;
  tabindex_medals = tabnum++;
  tabindex_automaton = tabnum++;
  tabindex_squirrel = tabnum++;
  tabindex_amber = tabnum++;

  for(var i = 0; i < tabnum; i++) tabs[i] = new Flex(contentFlex, 0, 0, 1, 1);

  fieldFlex = tabs[tabindex_field];
  fieldFlex.div.style.userSelect = 'none'; // prevent unwanted selections when double clicking things
  upgradeFlex = tabs[tabindex_upgrades];
  fruitFlex = tabs[tabindex_fruit];
  medalFlex = tabs[tabindex_medals];
  field2Flex = tabs[tabindex_field2];
  field2Flex.div.style.userSelect = 'none'; // prevent unwanted selections when double clicking things
  upgrade2Flex = tabs[tabindex_upgrades2];
  field3Flex = tabs[tabindex_field3];
  field3Flex.div.style.userSelect = 'none'; // prevent unwanted selections when double clicking things
  automatonFlex = tabs[tabindex_automaton];
  squirrelFlex = tabs[tabindex_squirrel];
  amberFlex = tabs[tabindex_amber];

  updateTabButtons();

  initFieldUI();
  initInfoUI();
  initField2UI();
  initField3UI();

  updatePausedUI();

  update_prev_state_ctor_count = -1;

  if(state) setTab(state.currentTab);
  else setTab(0, true);

  prevGoal = -1; // causes redraw of goal chips, arrows, ... if necessary
}

var pausedflex = undefined;
var pausedbuttoncanvasstate = -1;
var pausedflextext = undefined; // because reading .innerText is slow

function updatePausedUI() {
  var needflex = state.paused || large_time_delta;

  if(needflex && !pausedflex) {
    pausedflex = new Flex(contentFlex, 0, 0, 1, 1, FONT_FULL);
    centerText2(pausedflex.div);
    pausedflex.div.style.pointerEvents = 'none';
    pausedflex.div.style.color = '#f008';
  } else if(!needflex && pausedflex) {
    pausedflex.removeSelf(contentFlex);
    pausedflex = undefined;
    pausedflextext = undefined;
  }

  if(state.paused && pausedflextext != 'Paused') {
    pausedflextext = 'Paused';
    pausedflex.div.textEl.innerText = pausedflextext;
  } else if(heavy_computing && pausedflextext != 'Computing') {
    pausedflextext = 'Computing';
    pausedflex.div.textEl.innerText = pausedflextext;
  }

  if(state.paused && pausedbuttoncanvasstate != 1) {
    pausedbuttoncanvasstate = 1;
    renderImage(image_paused, pauseButtonCanvas);
  } else if(!state.paused && pausedbuttoncanvasstate != 0) {
    pausedbuttoncanvasstate = 0;
    renderImage(image_pause, pauseButtonCanvas);
  }
}

var holiday_hats_active = 0; // used here but also for ui_field2 caching

// some parts of the UI are updated more often than just in initUI, their functions, even for initial creation, are called 'update' instead of 'init'
// this one is not called per frame, only for some more rare actions that have high likelyhood of invalidating the UI (e.g. loading a save, or undo)
function updateUI() {
  updateUpgradeUI();
  //updateMedalUI();
  //updateResourceUI();
  updateTabButtons();
  updateUpgrade2UI();
  updateAutomatonUI();
  updateAmberUI();
  updateSquirrelUI();
  updatePausedUI();
}

// the one for during a game update
function updateUI2() {
  renderField();
  renderField2();
  renderField3();
  renderPond();
  updateResourceUI();
  updateUpgradeUIIfNeeded();
  updateUpgrade2UIIfNeeded();
  updateTabButtons();
  updateAbilitiesUI();
  updateRightPane();
  updatePausedUI();
  if(squirrelUINeedsFastUpdate()) updateSquirrelUI(true);
  if(updatetooltipfun) {
    updatetooltipfun();
  }
  if(globalupdatedialogfun) {
    globalupdatedialogfun();
    if(dialog_level == 0) globalupdatedialogfun = undefined;
  }
  updateSettingsAboutIcon();
  if(holidayEventActive() != holiday_hats_active) {
    holiday_hats_active = holidayEventActive();
    state.initEvolutionAndHatImages();
    updateUI();
  }
}

//document.body.style.fontFamily = 'Verdana, Arial, Helvetica, sans-serif';

var oldfont = false;

if(oldfont) {
  document.body.style.fontFamily = 'Verdana, sans-serif';
  //document.body.style.fontSize = '0.9em';
} else {
  document.body.style.fontFamily = 'Arial, sans-serif';
  //document.body.style.fontSize = '1em';
}

////////////////////////////////////////////////////////////////////////////////

function setCSSFile(file) {
  var link = document.getElementById('csslink');
  link.setAttribute("href", file);
}

function setStyle() {
  // add version code, otherwise the CSS files get cached for a long time and if new styles are added they won't be picked up when loading a next game version
  // caching within a game version is desired though
  var version_code = '?v=' + formatVersion().replace(/\./g, '_');
  if(state.uistyle == 2) {
    setCSSFile('style_dark.css' + version_code);
  } else if(state.uistyle == 3) {
    setCSSFile('style_dark2.css' + version_code);
  } else {
    setCSSFile('style_light.css' + version_code);
  }
}
