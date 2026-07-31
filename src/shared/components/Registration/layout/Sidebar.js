import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import SidebarItem from "./SidebarItem";
import logo from "@assets/assets/logo.svg";

// Flattens the sections config into a single ordered list of steps.
// A section with children contributes each child as its own step; a
// section with no children (e.g. "Review & Complete") contributes itself.
const buildFlattenedSteps = (sections = []) =>
  sections.flatMap((section) =>
    Array.isArray(section.children) && section.children.length > 0
      ? section.children.map((child) => ({
          key: child.key,
          optional: Boolean(child.optional),
        }))
      : [{ key: section.key, optional: Boolean(section.optional) }],
  );

// A step is unlocked if every REQUIRED step before it (in order) is already
// completed. Optional steps never block what comes after them - reaching
// an optional step is enough to also unlock the step(s) that follow it,
// even if the optional step itself has no data yet.
const computeUnlockedKeys = (sections, completedKeys) => {
  const steps = buildFlattenedSteps(sections);
  const unlocked = new Set();

  for (const step of steps) {
    unlocked.add(step.key);
    const isDone = completedKeys.includes(step.key);
    if (!isDone && !step.optional) {
      // Hit a required step that isn't filled yet - stop here, everything
      // after this remains locked until this one is completed.
      break;
    }
  }

  return unlocked;
};

const Sidebar = ({
  sections,
  activeKey,
  onSelect,
  isOpen,
  onClose,
  completedKeys = [], // <-- declared + defaulted, this was missing
}) => {
  const unlockedKeys = useMemo(
    () => computeUnlockedKeys(sections, completedKeys),
    [sections, completedKeys],
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={` fixed lg:static top-0 left-0 z-50 h-screen w-80 sm:w-96 lg:w-80 xl:w-96
            border-r border-card-border bg-white shrink-0 transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-5 right-5 text-slate-400 hover:text-slate-600"
        >
          <Icon icon="tabler:x" width={20} height={20} />
        </button>

        {/* Logo block */}
        <div className="flex items-center gap-1 px-6 pt-6 pb-4">
          <img
            src={logo}
            alt="MediConnect"
            className="w-12 h-11 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <h1 className="text-[16px] font-semibold leading-none text-primary-dark">
              MediConnect
            </h1>
            <p className="text-[10px] font-normal leading-2.5 text-primary">
              Healthcare Ecosystem
            </p>
          </div>
        </div>

        {/* Nav block */}
        <nav className="flex flex-col py-4 lg:pt-18 px-6 overflow-x-hidden overflow-y-auto h-[calc(100vh-100px)]">
          {sections.map((section, index) => (
            <SidebarItem
              key={section.key}
              section={section}
              activeKey={activeKey}
              completedKeys={completedKeys}
              unlockedKeys={unlockedKeys}
              onSelect={(key) => {
                onSelect(key);
                onClose?.(); // auto-close drawer on mobile after picking a section
              }}
              isLast={index === sections.length - 1}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;