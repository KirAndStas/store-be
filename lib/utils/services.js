import { mainUrl, appPort, staticUrl } from '../../etc/config.json';

const COLORS = {
    Blue   : '#1F94F2',
    Forest : '#01978D',
    Grass  : '#4EAF50',
    Green  : '#8AC246',
    Purple : '#8EB4E3',
    Sea    : '#00BDD3',
    Yellow : '#D0DE37'
};

export function dumpTimeline(timeline) {
    return {
        categories    : timeline.categories,
        processGuides : timeline.processGuides,
        sections      : timeline.sections,
        processMaps   : timeline.processMaps,
        tutorials     : timeline.tutorials,
        libraries     : timeline.libraries,
        usersPerDay   : timeline.usersPerDay
    };
}

export function dumpCategory(category) {
    return {
        id       : category._id,
        position : category.position,
        title    : category.title,
        links    : {
            processGuides : category.processGuides.map(processGuide => {
                return {
                    type : 'processGuide',
                    id   : processGuide
                };
            })
        }
    };
}

export function dumpProcessGuide({ processGuide, sections = [], processMap = {}, relatedProcessGuides = [] }) {
    return {
        id       : processGuide._id,
        title    : processGuide.title,
        color    : COLORS[processGuide.color],
        position : processGuide.position,
        icon     : `${mainUrl}${appPort}/${staticUrl}/icons/${processGuide.icon.filename}`,
        links    : {
            processMap : processMap && Object.keys(processMap).length > 0
                ? { type : 'processMap',
                    id   : processMap._id ? processMap._id : processMap }
                : {},
            sections : sections.map(section => {
                return {
                    type : 'section',
                    id   : section._id ? section._id : section
                };
            }),
            processGuides : relatedProcessGuides.map(relatedProcessGuide => {
                return {
                    type : 'processGuide',
                    id   : relatedProcessGuide._id ? relatedProcessGuide._id : relatedProcessGuide
                };
            })
        }
    };
}

export function dumpSection(section) {
    const sectionTutorial = section.tutorial;
    const sectionLibrary = section.library;

    return {
        id       : section._id,
        title    : section.title,
        position : section.position,
        picture  : `${mainUrl}${appPort}/${staticUrl}/pictures/${section.picture.filename}`,
        text     : section.text,
        links    : {
            tutorial : sectionTutorial
                ? {
                    type : 'tutorial',
                    id   : sectionTutorial._id ? sectionTutorial._id : sectionTutorial
                } : {},
            file : sectionLibrary
                ? {
                    type : 'file',
                    id   : sectionLibrary._id ? sectionLibrary._id : sectionLibrary
                } : {}
        }
    };
}

export function dumpGuideForLibrariesTutorialsProcessMap(processGuide) {
    return {
        id       : processGuide._id,
        position : processGuide.position,
        title    : processGuide.title
    };
}

export function dumpProcessMap({ processMap, processGuide = {} }) {
    if (!processMap) return;

    return {
        id       : processMap._id,
        title    : processMap.title,
        text     : processMap.text,
        url      : processMap ? `${mainUrl}${appPort}/${staticUrl}/processMaps/${processMap.processMap.filename}` : '',
        metaData : processMap.metaData,
        links    : processGuide && Object.keys(processGuide).length > 0
            ? {
                type : 'processGuide',
                id   : processGuide._id ? processGuide._id : processGuide
            } : {}
    };
}

export function dumpTutorial({ tutorial, processGuide = null }) {
    return {
        id       : tutorial._id,
        position : tutorial.position,
        title    : tutorial.title,
        url      : `${mainUrl}${appPort}/${staticUrl}/tutorials/${tutorial.tutorial.filename}`,
        file     : `${mainUrl}${appPort}/${staticUrl}/tutorialFiles/${tutorial.file.filename}`,
        preview  : `${mainUrl}${appPort}/${staticUrl}/previews/${tutorial.preview.filename}`,
        metaData : tutorial.metaData,
        links    : processGuide
            ? {
                type : 'processGuide',
                id   : processGuide ? processGuide._id : null
            } : undefined
    };
}

export function dumpLibrary({ library, processGuide = null }) {
    if (!library) return;

    return {
        id        : library._id,
        title     : library.title,
        position  : library.position,
        url       : `${mainUrl}${appPort}/${staticUrl}/libraries/${library.library.filename}`,
        type      : library.type,
        createdAt : library.createdAt,
        links     : processGuide
            ? {
                type : 'processGuide',
                id   : processGuide ? processGuide._id : null
            } : undefined
    };
}

export function dumpBookmark(bookmark) {
    const { _id, userId, type, instanceId } = bookmark;

    return {
        id : _id,
        userId,
        type,
        instanceId
    };
}

export function dumpHistory(history) {
    const { _id, userId, type, instanceId } = history;

    return {
        id : _id,
        userId,
        type,
        instanceId
    };
}

export function dumpBookmarkGuide(processGuide) {
    return {
        'id'       : processGuide._id,
        'position' : processGuide.position,
        'title'    : processGuide.title
    };
}

export function dumpNewUser(user) {
    const { email, password,  canAccessKeystone } = user;

    return {
        email,
        password,
        canAccessKeystone
    };
}

export function dumpUser(user) {
    const { email, password, canAccessKeystone, _id } = user;

    return {
        id : _id,
        email,
        password,
        canAccessKeystone
    };
}
