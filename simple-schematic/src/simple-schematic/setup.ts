import {getWorkspace} from '@schematics/angular/utility/config';
import {buildDefaultPath} from '@schematics/angular/utility/project';
import {parseName} from '@schematics/angular/utility/parse-name';
import {Tree} from '@angular-devkit/schematics';

export function setupOptions(host: Tree, options: any): Tree {
    const workspace = getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    
    if (options.path === undefined) {
        options.path = buildDefaultPath(project);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return host;
}