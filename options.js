/*
 *   Copyright (C) 2021 Sellers Industry
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Wed Dec 01 2021
 *   file: options.js
 *   project: Moodle Custom Menu
 *   purpose: Option Menu
 *
 */


// Add Item rows
function addItemRow( meta={ "label": "", "link": "", "icon": "" } ) {
    let container = document.querySelector( ".item-list-container" );
    let itemCount = document.querySelectorAll( ".item-list-container .item-row" ).length;
    let innerHTML = `
                        <div class="item-row" id="item-${ itemCount }">
                            <div class="item-input">
                                <p>Label</p>
                                <input class="item-control-label" type="text" placeholder="Dashboard" value="${ meta.label }">
                            </div>
                    
                            <div class="item-input">
                                <p>Link</p>
                                <input class="item-control-link" type="text" placeholder="https://moodle.rose-hulman.edu/my/" value="${ meta.link }">
                            </div>
                    
                            <div class="item-input">
                                <p>Image URL</p>
                                <input class="item-control-icon" type="text" placeholder="https://sellersew.com/favicon/favicon-32x32.png" value="${ meta.icon }">
                            </div>
                    
                            <div class="item-contol">
                                <button class="item-control-remove">Remove</button>
                            </div>

                            <div class="item-contol">
                                <button class="item-control-up">&#8593;</button>
                            </div>

                            <div class="item-contol">
                                <button class="item-control-down">&#8595;</button>
                            </div>
                        </div>
                    `;
    let dom = new DOMParser().parseFromString( innerHTML, "text/html" );
    dom.querySelector( ".item-control-remove" ).addEventListener( "click", () => {
        removeItemRow( itemCount );
    });
    dom.querySelector( ".item-control-up" ).addEventListener( "click", () => {
        moveItemUp( itemCount );
    });
    dom.querySelector( ".item-control-down" ).addEventListener( "click", () => {
        moveItemDown( itemCount );
    });
    container.appendChild( dom.querySelector( ".item-row" ) );
}


// Remove Items
function removeItemRow( index ) {
    document.querySelector( ".item-list-container" ).removeChild( document.querySelector( `#item-${ index }` ) );
}


// Array Move
function arraymove( arr, fromIndex, toIndex ) {
    fromIndex   = Math.max( Math.min( fromIndex, arr.length - 1 ), 0 );
    toIndex     = Math.max( Math.min( toIndex, arr.length - 1 ), 0 );
    let element = arr[ fromIndex ];
    arr.splice( fromIndex, 1 );
    arr.splice( toIndex, 0, element );
    return arr;
}


// Move Item Up
function moveItemUp( index ) {
    loadItems( arraymove( getItems(), index, index - 1 ) );
}


// Move Item Down
function moveItemDown( index ) {
    loadItems( arraymove( getItems(), index, index + 1 ) );
}


// Get Items
function getItems() {
    let items = [];
    document.querySelectorAll( ".item-list-container .item-row" ).forEach( elm => {
        let _label = elm.querySelector( ".item-control-label" ).value;
        let _link  = elm.querySelector( ".item-control-link" ).value;
        let _icon  = elm.querySelector( ".item-control-icon" ).value;

        if ( _label != "" && _link != "" )
            items.push( {
                    "label": _label,
                    "link": _link,
                    "icon": _icon,
                });
    });
    return items;
}


// Save Items
function saveItems() {
    chrome.storage.sync.set( { "items": getItems() }, () => {
        alert( "Updated the sidebar settings for moodle. You can now reload your moodle site." );
        window.location.reload();
    });
}


// Load Items
function loadItems( items ) {
    let container = document.querySelector( ".item-list-container" );
    container.innerHTML = "";
    items.forEach( ( item ) => { addItemRow( item ); } );
    addItemRow();
}


// Init
function init() {
    let addBtn    = document.querySelector( "#action-btn-add-item" );
    let saveBtn   = document.querySelector( "#action-btn-save-items" );
    addBtn.addEventListener( "click", () => { addItemRow(); });
    saveBtn.addEventListener( "click", () => { saveItems(); });
    chrome.storage.sync.get( [ "items" ] , function( result ) {
        loadItems( result[ "items" ] );
    });
}


init();

