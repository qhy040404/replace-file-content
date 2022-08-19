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

    /**
     * debug
     */
    core.info(file_name)
    core.info(past_data)
    core.info(new_data)
    core.info(String(count))
    core.info(String(timer))

    const file = await findFiles(file_name)

    let data = fs.readFileSync(file, 'utf8')
    while (timer < count) {
        timer++
        /**
         * debug
         */
        core.info(`timer${timer}`)

        data = data.replace(past_data, new_data)
    }

    try {
        /**
         * debug
         */
        core.info(data)
        fs.writeFileSync(file, data, 'utf8')
        core.info('File overwritten')
    } catch (e) {
        core.error(`${e}`)
    }
}

// noinspection JSIgnoredPromiseFromCall
run()