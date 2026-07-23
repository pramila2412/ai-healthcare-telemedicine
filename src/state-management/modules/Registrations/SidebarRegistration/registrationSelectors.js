
export const getActiveSectionKey = (state) => state.registrations.sidebarRegistration.activeSectionKey;

export const getSectionData = (state, sectionKey) =>
  state.registrations.sidebarRegistration.formDataBySection[sectionKey] || {};

export const getCompletedSections = (state) => state.registrations.sidebarRegistration.completedSections;

export const isSectionComplete = (state, sectionKey) =>
  state.registrations.sidebarRegistration.completedSections.includes(sectionKey);