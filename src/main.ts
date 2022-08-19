import * as core from '@actions/core'
import * as fs from 'fs-extra'
import {findFiles} from "./file-helper";
import {log} from "./debug-tool";

async function run() {
    core.info('Import input datas')
    const file_name = core.getInput('file', {required: true})
    const past_data = core.getInput('past', {required: true})
    const new_data = core.getInput('content', {required: true})
    const count = parseInt(core.getInput('count'))
    let timer = 0

    log(file_name)
    log(past_data)
    log(new_data)
    log(count)

    const file = await findFiles(file_name)

    let data = fs.readFileSync(file, 'utf8')
    while (timer < count) {
        timer++
        log(`timer=${timer}`)
        data = data.replace(past_data, new_data)
    }

    try {
        log(`${data}`)
        fs.writeFileSync(file, data, 'utf8')
        core.info('File overwritten')
    } catch (e) {
        core.error(`${e}`)
    }
}

// noinspection JSIgnoredPromiseFromCall
run()