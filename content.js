/*
 *   Copyright (C) 2021 Sellers Industry
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Tue Nov 30 2021
 *   file: content.js
 *   project: Moodle Custom Menu
 *   purpose: Edits HTML on page
 *
 */

let optionsUrl = chrome.runtime.getURL( "/options.html" );
let image      = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEz0lEQVR4nO2dz08cZRjHv+/MsnQXi20oSXFDNKm724YjXjgskhovIlFJLBfjyQOmxoNnjfgvlACJqfEgh4Y0arKSGBPLr7Q1BJp4aO0ujVFScAulFlh+LTPzeGghK+zO7jaz89CZ53PbeWfe58n72Yedd+adARAEQRAEQRAEwW8opzpKpJbJqb7cpFEpfJ9arvzArnOOjJ3mRCfPMy0nQ+iON7LF970AgFeCCHgKlwQRkAeHBBFwALcliIACuClBBBTBLQkiwAY3JIiAElRbgggog2pKEAFlUi0JIqACqiFBBFRIy8kQ3os5JyHgWE/PKeOPNlnjSwUwIwKYEQHMiABmRAAzIoAZEcCMCGBGBDDDNhOeSj+0bU/EThVt2zUIv/254mg+dvGqiVQAMyKAGRHAjAhgRgQwIwKYEQHM+P75gGdlKt4ozwd4ARHAjAhgRgQwIwKYEQHMiABm5H5AGfGqiVQAMyKAGRHAjAhgRgQwIwKYEQHMyP2AAhCZWN+ew+r2PWR3MtjMPUbO2IJpmYACdBVA25k3bxOQUkQzlqaPXX91ehqqz6o0lgjIY8dYxuLqJJbW08gZW7b7JqKdBzfdJ6LhgKYPjEfful9uTBEAYNdcw1+PkniwNgei8r7EBQTskQPwTdDMffHrue6S03Xf/wYsrd/AzN+XkFlNlT34JQgC+DinB1PtqWRPqZ19K4BgYG5pGKkHP8OwctUI0UBKXUmkR4c6xsaKXnPzpQDL2sHtxcvIrKVdiEa9ZmTjx9bFZLhQq+8EEAzcyXyLfzcX3QzbGc6qkUKV4DsB95auuD34e3SakY1LBzeynQWx3A9QdwH1S0WHTHR8Zdv++cJ0ZSko1TMZ7RzZ++yjCtgG1BR3EiCiwY5Ucv/b5R8B2g0A9pMrl2gwNPTtffCJgCyAP7iT2EeR+qgtlYwAfhGg/Q7A5M4in9qApl0EfCGAAKS4kziEIvrwfRrRfSAggyd/go4WBEQy6VCr9wWosi9Muo7StPOevxp6J3MZK9n5ou2lzvPbw/avJ5vctP/fAyXmCVc9XwFbucfcKRRHIe55ATljmzuF4hCaPC/AJIM7BTuOe16AUo79zFUFzwuo0YLcKdix7n0BgWPcKRRH4R/PCzgWOM6dQlEU4a7n35xbH2rGQ5t5wOvjX9oe7/T9gHwshVnPV8CJUIw7haLolnXN8wLqal5GMBDiTqMQ8xOxW96vACgNTfUt3FkcRmEYqs/yvgAATS+2Q1M6dxr57BgWDQI+mAcAQI1+Aqfr49xp5PP1zXjXAuATAQDwSkMXao/GnGAlaOb2T618I0DX6nDm1BvcaQCKevMX7R7tCyVVIJEeHQKolyl8/1Ts7U/zN/imAvY4Hd34RAE/uB+ZftIX6j47uNV3FQAArYvJcDirRgAUXeTvJAoquRva6LnZfOHQwiTfVQAAzL7Utakv1L0LYMiFcP3aQri70OADPq2AfNrnRi8Q0QAAh18WQUtQuDgV7bpqt5cvKyCfyWjniLEbiJOiAQA7DnS5DaCfatXZUoMPSAX8j7ZUMhLQtIsgfABQc4WHzyvgO9MyB6+ffafs9e8ioBDUpyXSra8pTTtPRK1QiIMQAfDC0z2yTxYcUZoUZnTLujYRuzX7LI+p/gegzHwnmtxSiAAAAABJRU5ErkJggg==`;
let dummyFill  = `
                <div style='display: flex; color: white; padding: 0.25rem 1rem 0 0;'>
                    <div style="padding: 0.25rem 1rem 0 0; display: flex; align-items: center; justify-content: center;">
                        <img style="width: 35px;" src="${ image }">
                    </div>
                    <div>
                        <b>Custom Moodle Menu</b>
                        <br>
                        Add menu items through the extension <a href="${ optionsUrl }" target="blank" style="color: white; text-decoration: underline;">options</a>.
                    </div>
                </div>`;

// Build Html for Sidebar
function buildHtmlDom( items ) {
    let html = "<ul class='navbar-nav'>";
    items.forEach( ( item, index ) => {
        html += `
            <li data-key="c-${index}" class="nav-item" role="none">
                <a role="menuitem" class="nav-link" href="${ item[ "link" ] }" tabindex="-1" style="padding: 1rem;">
                    ${ item[ "label" ] }
                </a>
            </li>`
    });
    return html + "</ul>";
}


// Inject Sidebar
function inject( htmlDom ) {
    let menu = document.querySelector(".primary-navigation .navigation");
    menu.innerHTML += htmlDom;
}


// Init
function init() {
    document.querySelector(".primary-navigation .navigation ul").style["display"] = "none";
    document.querySelector("#page-footer").innerHTML += "<p style='color:gray;text-align: center;padding: 0 1rem 0 1rem;margin:0;'>Moodle Custom Menu designed by <a href='https://sellersew.com' target='blank' style='color:grey;text-decoration:underline;'>Sellers LLC</a>";
    document.querySelector("#page-footer").innerHTML += "<p style='color:grey;text-align:center;padding:0 1rem 2rem 1rem;font-size:0.6rem;margin:0;'>If you need wisdom, ask our generous God, and he will give it to you. He will not rebuke you for asking. - James 1:5</p>"
    
    chrome.storage.sync.get( [ "items" ] , function( result ) {
        if ( !result[ "items" ] || result[ "items" ].length == 0 ) {
            inject( dummyFill );
        } else {
            inject( buildHtmlDom( result[ "items" ] ) );
        }
    });
}

init();