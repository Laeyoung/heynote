import { parseMixed } from "@lezer/common"

import { jsonLanguage } from "@codemirror/lang-json"
import { pythonLanguage } from "@codemirror/lang-python"
import { javascriptLanguage } from "@codemirror/lang-javascript"
import { htmlLanguage } from "@codemirror/lang-html"
import { StandardSQL } from "@codemirror/lang-sql"
import { markdownLanguage } from "@codemirror/lang-markdown"
import { javaLanguage } from "@codemirror/lang-java"
import { lezerLanguage } from "@codemirror/lang-lezer"
import { phpLanguage } from "@codemirror/lang-php"

import { NoteContent, NoteLanguage } from "./parser.terms.js"
import { LANGUAGES } from "../languages.js"

const languageMapping = Object.fromEntries(LANGUAGES.map(l => [l.token, l.parser]))


export function configureNesting() {
    return parseMixed((node, input) => {
        let id = node.type.id
        if (id == NoteContent) {
            let noteLang = node.node.parent.firstChild.getChildren(NoteLanguage)[0]
            let langName = input.read(noteLang?.from, noteLang?.to)
            //console.log("langName:", langName)
            if (langName in languageMapping && languageMapping[langName] !== null) {
                //console.log("found parser for language:", langName)
                return {
                    parser:languageMapping[langName],
                }
            }
        }
        return null
    })
}
