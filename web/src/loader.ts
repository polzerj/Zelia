import ComponentInfo from "./types/ComponentInfo";


var componentSources: { [key: string]: string } = {};

async function downloadComponentSource(comp: ComponentInfo) {
    const res = await fetch(comp.path);
    componentSources[comp.tagName] = await res.text();
}

export async function initializeComponents(compInfos: ComponentInfo[]) {
    let downloads: Promise<void>[] = [];
    for (const comp of compInfos) {
        downloads.push(downloadComponentSource(comp));
    }
    // download component Source
    await Promise.all(downloads);

    // define components 
    for (const comp of compInfos) {
        window.customElements.define(comp.tagName, comp.type);
    }
    //Cannot compbine these two four loops cause the soucre needs to be downloaded first since it is used by the component after the definition is done
}

export function getComponentTemplateAsString(tagName: string): string {
    return componentSources[tagName];
}
