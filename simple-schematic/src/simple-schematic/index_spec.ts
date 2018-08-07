import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';
import {Schema as ApplicationOptions} from '@schematics/angular/application/schema';

describe('simple-schematic', () => {

    const schematicRunner = new SchematicTestRunner(
        '@schematics/angular',
        path.join(__dirname, '..', '..', 'node_modules', '@schematics', 'angular', 'collection.json')
    );

    const testRunner = new SchematicTestRunner(
        'rocket',
        path.join(__dirname, '..', 'collection.json')
    );

    const workspaceOptions: WorkspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '6.0.0',
    };

    describe('with project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
        });

        it('fails with missing tree', () => {
            expect(() => testRunner.runSchematic('simple-schematic', {}, Tree.empty())).toThrow();
        });

        it('fails with missing params', () => {
            expect(() => testRunner.runSchematic('simple-schematic', {}, appTree)).toThrow();
        });

        it('works', () => {
            const tree = testRunner.runSchematic('simple-schematic', {
                name: "test"
            }, appTree);

            expect(tree.files).toEqual([]);
        });

    });

    describe('without project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
        });

        it('fails with missing tree', () => {
            expect(() => testRunner.runSchematic('simple-schematic', {}, Tree.empty())).toThrow();
        });

        it('fails with missing params', () => {
            expect(() => testRunner.runSchematic('simple-schematic', {}, appTree)).toThrow();
        });

        it('works', () => {
            const tree = testRunner.runSchematic('simple-schematic', {
                name: "test"
            }, appTree);

            expect(tree.files).toEqual([]);
        });

    });

});
