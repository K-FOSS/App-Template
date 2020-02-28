# App-Template UI Server

**Environment Variables**

| Name              | Description                                               | Required | Default          |
| ----------------- | --------------------------------------------------------- | -------- | ---------------- |
| AUTH_REQUIRED     | Require auth to access UI                                 | NO       | TRUE             |
| SECRET_KEY        | The secret key used to sign data                          | NO       | super-secret-key |
| API_HOST          | The hostname of the API Server                            | NO       | api              |
| API_SHARED_SECRET | API Shared secret key for internal local GraphQL Requests | NO       | super-secret-key |
| UI_SHARED_SECRET  | UI Shared secret key used to sign the cookie              | NO       | super-secret-key |
| DOMAIN            | Public domain for the SSO Server. (MUST BE HTTPS)         | YES      | example.com      |

```
// src/findFiles.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { pathToFileURL } from 'url';
const JS_EXTS = ['.js', '.jsx'];
async function findFileReadDir(cwd, { fileName, extensions }) {
    // Get all files in a directory
    const directoryFiles = await fs.readdir(cwd);


    // Filter the diretory files to only thoose with passed extenison and `.js` or `.jsx`
    const matchedFiles = directoryFiles.filter((directoryFileName) => [...extensions, ...JS_EXTS].includes(directoryFileName.split(fileName)[1]));
    if (matchedFiles.length > 1 || matchedFiles.length < 1) {
        return undefined;
    }

    return resolvePath(cwd, matchedFiles[0]);
}
export async function findFiles(cwd, fileRules) {
    console.log('HelloWorld')

    let filePath = await findFileReadDir(cwd, fileRules);

    if (!filePath) {
        const test = await findFileReadDir(`${cwd}/${fileRules.fileName}/`, { extensions: ['index.js'] })
        console.log('Fucker')

        throw new Error('No files found by finder');
    }

    return pathToFileURL(filePath);
}
```
