import * as _ from "lodash";
/* tslint:disable:no-var-requires */
import * as benchmark from "benchmark";
const platform = require("platform");
/* tslint:enable:no-var-requires */

import {mandelbrot as transpiledParallelMandelbrot} from "./transpiled/mandelbrot";
import {syncKnightTours, parallelKnightTours as transpiledParallelKnightTours} from "./transpiled/knights-tour";
import {syncMonteCarlo as simJsMonteCarlo, parallelMonteCarlo as simJsParallelMonteCarlo} from "./transpiled/monte-carlo";

import {parallelKnightTours as dynamicParallelKnightTours} from "./dynamic/knights-tour";
import {createMandelOptions, parallelMandelbrot as dynamicParallelMandelbrot, syncMandelbrot} from "./dynamic/mandelbrot";
import {IMonteCarloSimulationOptions, syncMonteCarlo as randomMonteCarlo, parallelMonteCarlo as randomParallelMonteCarlo, IProject} from "./dynamic/monte-carlo";

import {parallelJSMandelbrot} from "./paralleljs/mandelbrot";
import {parallelJSMonteCarlo} from "./paralleljs/monte-carlo";
import {parallelJSKnightTours} from "./paralleljs/knights-tour";

let Benchmark = (benchmark as any).runInContext({ _ });
(window as any).Benchmark = Benchmark;

const runButton = document.querySelector("#run") as HTMLInputElement;
const outputTable = document.querySelector("#output-table") as HTMLTableElement;
const jsonOutputField = document.querySelector("#json-output") as HTMLElement;

const setCheckboxes = document.querySelectorAll('[id*="-set"]') as NodeListOf<HTMLInputElement>;

const knightRunner6x6 = document.querySelector("#knight-runner-6-6") as HTMLInputElement;

type Deferred = { resolve: () => void };

function addAsyncTest(suite: benchmark.Suite, title: string, fn: (this: undefined) => PromiseLike<any>) {
    suite.add(title, function (this: benchmark, deferred: Deferred) {
        const benchmark = this;
        fn.apply(undefined, [])
            .then(function () { deferred.resolve() },
                function (error: any) {
                    console.error(error);
                    benchmark.error = error;
                    deferred.resolve();
                }
            );
    }, {
        defer: true
    })
}

function addKnightBoardTests(suite: benchmark.Suite) {
    const boardSizes = knightRunner6x6.checked ? [5, 6] : [5];

    for (const boardSize of boardSizes) {
        const title = `Knights Tour (${boardSize}x${boardSize})`;
        suite.add(`sync: ${title}`, function () {
            syncKnightTours({x: 0, y: 0}, boardSize);
        });

        addAsyncTest(suite, `parallel-dynamic: ${title}`, () => dynamicParallelKnightTours({x: 0, y: 0}, boardSize));
        addAsyncTest(suite, `parallel-transpiled: ${title}`, () => transpiledParallelKnightTours({x: 0, y: 0}, boardSize));
        addAsyncTest(suite, `paralleljs: ${title}`, () => parallelJSKnightTours({x: 0, y: 0}, boardSize));
    }
}

function addMonteCarloTest(suite: benchmark.Suite, options: IMonteCarloSimulationOptions & {numberOfProjects: number, numRuns: number}) {
    const runOptions = Object.assign(options, {
        projects: createProjects(options.numberOfProjects)
    });

    const configName = `(projects: ${options.numberOfProjects}, runs: ${options.numRuns.toLocaleString()})`;

    suite.add(`sync: Monte Carlo Math.random ${configName}`, function () {
        randomMonteCarlo(options);
    });

    addAsyncTest(suite, `parallel-dynamic: Monte Carlo Math.random ${configName}`, () => randomParallelMonteCarlo(runOptions));
    suite.add(`sync: Monte Carlo simjs ${configName}`, function () {
        simJsMonteCarlo(options);
    });

    addAsyncTest(suite, `parallel-transpiled: Monte Carlo simjs ${configName}`, () => simJsParallelMonteCarlo(runOptions));
    addAsyncTest(suite, `paralleljs: Monte Carlo simjs ${configName}`, () => parallelJSMonteCarlo(runOptions));
}

function addMonteCarloTests(suite: benchmark.Suite) {
    const monteCarloOptions = {
        investmentAmount: 620000,
        numRuns: 100000,
        numYears: 15,
        performance: 0.0340000,
        seed: 10,
        volatility: 0.0896000
    };

    for (const numRuns of [10 ** 4, 10 ** 5]) {
        for (const numberOfProjects of  [1, 4, 8, 16]) {
            const options = Object.assign({}, monteCarloOptions, { numberOfProjects, numRuns });
            addMonteCarloTest(suite, options);
        }
    }
}

function addMandelbrotTests(suite: benchmark.Suite) {
    const mandelbrotHeight = parseInt((document.querySelector("#mandelbrot-height") as HTMLInputElement).value, 10);
    const mandelbrotWidth = parseInt((document.querySelector("#mandelbrot-width") as HTMLInputElement).value, 10);
    const mandelbrotIterations = parseInt((document.querySelector("#mandelbrot-iterations") as HTMLInputElement).value, 10);

    const mandelbrotOptions = createMandelOptions(mandelbrotWidth, mandelbrotHeight, mandelbrotIterations);

    suite.add(`sync: Mandelbrot ${mandelbrotWidth}x${mandelbrotHeight}, ${mandelbrotIterations}`, function () {
        syncMandelbrot(mandelbrotOptions, () => undefined);
    });

    for (const valuesPerTask of [undefined, 1, 150, 312, 625, 1250, 2500]) {
        const parallelOptions = { maxValuesPerTask: valuesPerTask, minValuesPerTask: valuesPerTask };
        let title = `Mandelbrot ${mandelbrotOptions.imageWidth}x${mandelbrotOptions.imageHeight}, ${mandelbrotOptions.iterations}`;
        if (valuesPerTask) {
            title += ` (${valuesPerTask})`;
        }

        addAsyncTest(suite, `parallel-dynamic: ${title}`, () => dynamicParallelMandelbrot(mandelbrotOptions, parallelOptions));
        addAsyncTest(suite, `parallel-transpiled: ${title}`, () => transpiledParallelMandelbrot(mandelbrotOptions, parallelOptions));
    }

    addAsyncTest(suite, `paralleljs: Mandelbrot ${mandelbrotWidth}x${mandelbrotHeight}, ${mandelbrotIterations}`, () => parallelJSMandelbrot(mandelbrotOptions));
}

function measure() {
    const allTestsSuite = new Benchmark.Suite();

    addMonteCarloTests(allTestsSuite);
    addMandelbrotTests(allTestsSuite);
    addKnightBoardTests(allTestsSuite);

    const suite = allTestsSuite.filter((benchmark: benchmark  & {name: string }) => {
        for (let i = 0; i < setCheckboxes.length; ++i) {
            const checkbox = setCheckboxes[i];
            const parts = checkbox.id.split("-");
            const name = parts.slice(0, parts.length - 1).join("-");

            if (checkbox.checked && benchmark.name.startsWith(name)) {
                return true;
            }
        }
        return false;
    });

    suite.forEach((benchmark: benchmark) => {
        const index = suite.indexOf(benchmark);
        benchmark.on("cycle", () => appendTestResults(benchmark, index));
    });

    suite.on("cycle", function (event: benchmark.Event) {
        const benchmark = event.target as (benchmark);
        const index = (event.currentTarget as Array<benchmark>).indexOf(benchmark);
        appendTestResults(benchmark, index);
    });

    suite.on("complete", function (event: benchmark.Event) {
        const benchmarks = (event.currentTarget as benchmark.Suite).map((benchmark: benchmark & {name: string }) => {
            return {
                info: benchmark.toString,
                name: benchmark.name,
                stats: benchmark.stats,
                times: benchmark.times
            };
        });

        jsonOutputField.textContent = JSON.stringify({ benchmarks, platform}, undefined, "    ");
        runButton.disabled = false;
    });

    suite.on("start", initResultTable);

    suite.run({async: true });
}

runButton.addEventListener("click", function (event: MouseEvent) {
    event.preventDefault();
    runButton.disabled = true;
    measure();
});

function initResultTable(event: benchmark.Event) {
    clearOutputTable();

    function clearOutputTable() {
        while (outputTable.tBodies.length > 0) {
            outputTable.removeChild(outputTable.tBodies[0]);
        }
    }

    const body = outputTable.createTBody();
    (event.currentTarget as Array<benchmark.Options>).forEach(suite => {
        const row = body.insertRow();
        const [set, ...nameParts] = suite.name!.split(":");

        row.insertCell().textContent = set;
        row.insertCell().textContent = nameParts.join(":");
        const columns = (outputTable.tHead.rows[0] as HTMLTableRowElement).cells.length;
        for (let i = 0; i < columns; ++i) {
            row.insertCell();
        }
    });
}

function appendTestResults(benchmark: benchmark, index: number) {
    const body = outputTable.tBodies[0] as HTMLTableSectionElement;
    const row = body.rows[index] as HTMLTableRowElement;

    row.cells[2].textContent = benchmark.stats.deviation.toFixed(4);
    row.cells[3].textContent = benchmark.stats.mean.toFixed(4);
    row.cells[4].textContent = benchmark.stats.moe.toFixed(4);
    row.cells[5].textContent = benchmark.stats.rme.toFixed(4);
    row.cells[6].textContent = benchmark.stats.sem.toFixed(4);
    row.cells[7].textContent = benchmark.stats.variance.toFixed(4);
    row.cells[8].textContent = benchmark.stats.sample.length.toFixed(0);
    row.cells[9].textContent = benchmark.hz.toFixed(4);
}

function createProjects(count: number): IProject[] {
    const projects: IProject[] = [];

    for (let i = 0; i < count; ++i) {
        projects.push({
            startYear: Math.round(Math.random() * 15),
            totalAmount: Math.round(Math.random() * 100000)
        });
    }

    return projects;
}