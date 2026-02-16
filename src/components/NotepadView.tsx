const DEFAULT_NOTE =
  'RhinoNet Notepad\n' +
  '\n' +
  'Tips:\n' +
  '- Nothing here syncs. That is a feature.\n' +
  '- Write your manifesto, grocery list, or fake IP address.\n' +
  '- If you miss autosave, pretend it is 1998.\n';

export function NotepadView() {
  return <textarea className="notepad" defaultValue={DEFAULT_NOTE} spellCheck={false} />;
}
