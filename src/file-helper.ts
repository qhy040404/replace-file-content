import * as glob from '@actions/glob'

export async function findFiles(name: string): Promise<string> {
    const globber = await glob.create(`${name}`)
    const files = await globber.glob()
    return files[0]
}