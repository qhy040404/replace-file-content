import * as core from '@actions/core'
import * as fs from 'fs-extra'
import {findFiles} from "./file-helper";

async function run() {
    core.info('Import input datas')
    const file_name = core.getInput('file', {required: true})
    const past_data = core.getInput('past', {required: true})
    const new_data = core.getInput('content', {required: true})
    const count = parseInt(core.getInput('count'))
    let timer = 0

    const file = await findFiles(file_name)
    core.debug(file)

    let data = fs.readFileSync(file, 'utf8')
    while (timer < count) {
        timer++
        data = data.replace(past_data, new_data)
    }

    try {
        fs.writeFileSync(file, data, 'utf8')
        core.info('File overwritten')
    } catch (e) {
        core.error(`${e}`)
    }
}

// noinspection JSIgnoredPromiseFromCall
run()