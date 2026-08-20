import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { NetUrl } from '../../types';

// My Computer: a fake C: drive. click a folder to open it, a file to read it.
// most files are flavor. a few are clue documents that record a discovery and
// can jump to a net page. no real filesystem, all authored.

type FileNode = {
  name: string;
  kind: 'folder' | 'file';
  children?: FileNode[];
  body?: string[];
  discovery?: string; // records this id the first time the file is opened
  open?: NetUrl; // offer a jump to a net page
};

const DRIVE: FileNode = {
  name: 'C:',
  kind: 'folder',
  children: [
    {
      name: 'SYSTEM',
      kind: 'folder',
      children: [
        {
          name: 'AUTOEXEC.BAT',
          kind: 'file',
          body: [
            '@ECHO OFF',
            'PROMPT $P$G',
            'PATH C:\\DOS;C:\\UTIL;C:\\SHELF',
            'SET RN=1',
            'LH C:\\UTIL\\MOUSE.COM',
            'REM the machine is faster without half of this and i know it',
          ],
        },
        {
          name: 'README.1ST',
          kind: 'file',
          body: [
            'If you are reading this you are poking around a stranger machine.',
            'Rude. Also welcome.',
            'The interesting things are not in SYSTEM. They never are.',
            'Try the NIGHTLOG folder if you want to know what somebody sat up for.',
          ],
        },
      ],
    },
    {
      name: 'SHELF',
      kind: 'folder',
      children: [
        {
          name: 'LOGSORT.EXE',
          kind: 'file',
          body: [
            '[binary, will not display as text]',
            'LOGSORT 1.4. Sorts a log by timestamp. Does one thing.',
            'Source and notes are up on the net shelf.',
          ],
          open: 'rn:n-daemon-file-of-week',
        },
        {
          name: 'NIGHTLOG.EXE',
          kind: 'file',
          body: [
            '[binary, will not display as text]',
            'NIGHTLOG 1.0. Timestamps whatever the modem hears. Rounds nothing.',
            'It wrote the log two folders down.',
          ],
          open: 'rn:n-daemon-nightlog',
        },
      ],
    },
    {
      name: 'NIGHTLOG',
      kind: 'folder',
      children: [
        {
          name: 'WATCH.LOG',
          kind: 'file',
          discovery: 'files_watchlog',
          body: [
            '# NIGHTLOG 1.0 capture, clock honest to the second',
            '02:14:11  carrier up',
            '02:14:12  group A ....',
            '02:14:13  group B .',
            '02:14:14  group C ..',
            '02:14:16  silence',
            '02:14:19  repeat 2 of 3',
            '02:14:27  repeat 3 of 3',
            '02:14:35  carrier down',
            '# three groups. three syllables. same every night.',
            '# it is not a name and it is not a distress word. it is a plain object.',
            '# the linemen named the whole unit after it. read carrier-the-tech.',
          ],
          open: 'rn:n-carrier-the-tech',
        },
        {
          name: 'NOTES.TXT',
          kind: 'file',
          body: [
            'do not post the word. confirm privately.',
            'the weather guy logged a pressure jump near one of my timestamps.',
            'probably a coincidence. keeping it in the pile of probably-coincidences anyway.',
            'the sealed decode is on the net at carrier-vault. the answer is the word.',
          ],
          open: 'rn:n-carrier-vault',
        },
      ],
    },
    {
      name: 'DOWNLOAD',
      kind: 'folder',
      children: [
        {
          name: 'PORCH.DAT',
          kind: 'file',
          body: [
            '30.10, 30.10, 30.09, 30.10  # a high, sitting still',
            '29.60 dropping fast  # the august storm, the one he got right',
            'a forecast without a time is just a mood.',
          ],
          open: 'rn:n-hank-the-storm',
        },
        {
          name: 'GUESTBOOK.HTM',
          kind: 'file',
          body: [
            '<HTML><BODY BGCOLOR=BLACK>',
            '<MARQUEE>welcome to my page!!!</MARQUEE>',
            '<!-- hit counter: 412 -->',
            'sign the book. best viewed at 800x600.',
            '</BODY></HTML>',
          ],
          open: 'rn:n-legend-home',
        },
      ],
    },
    {
      name: 'MY DOCUMENTS',
      kind: 'folder',
      children: [
        {
          name: 'TODO.TXT',
          kind: 'file',
          body: [
            '- fix the rain gauge (squirrel)',
            '- return the printer manual to swap_meet, i never had the printer',
            '- sign legends guestbook so he stops asking',
            '- stop staying up for the signal (will not do this)',
          ],
        },
        {
          name: 'DIARY.TXT',
          kind: 'file',
          discovery: 'files_diary',
          body: [
            'nobody reads a diary on a shared machine so this is basically a vault.',
            'i think about the archive that went missing in march more than i admit.',
            'a thing lost quietly is worse than a thing deleted loudly. she was right.',
            'if you are reading this, you went looking, and that means you get it too.',
          ],
        },
      ],
    },
  ],
};

function findPath(root: FileNode, target: FileNode, trail: FileNode[] = []): FileNode[] | null {
  if (root === target) return [...trail, root];
  if (!root.children) return null;
  for (const c of root.children) {
    const hit = findPath(c, target, [...trail, root]);
    if (hit) return hit;
  }
  return null;
}

export function FilesView({ onOpenBrowser }: { onOpenBrowser: (url: NetUrl) => void }) {
  const { recordDiscovery } = useGame();
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['C:', 'NIGHTLOG']));
  const [selected, setSelected] = useState<FileNode | null>(null);

  function toggle(name: string) {
    setOpenFolders((s) => {
      const n = new Set(s);
      if (n.has(name)) n.delete(name);
      else n.add(name);
      return n;
    });
  }

  function openFile(f: FileNode) {
    setSelected(f);
    if (f.discovery) recordDiscovery(f.discovery);
  }

  function renderNode(node: FileNode, depth: number) {
    if (node.kind === 'folder') {
      const isOpen = openFolders.has(node.name);
      return (
        <li key={node.name}>
          <button
            className='files-row files-folder'
            style={{ paddingLeft: `${depth * 14 + 6}px` }}
            onClick={() => toggle(node.name)}
          >
            <span className='files-caret'>{isOpen ? '-' : '+'}</span>
            <span className='files-icon'>[D]</span>
            {node.name}
          </button>
          {isOpen && node.children ? (
            <ul className='files-children'>{node.children.map((c) => renderNode(c, depth + 1))}</ul>
          ) : null}
        </li>
      );
    }
    return (
      <li key={node.name}>
        <button
          className={`files-row files-file ${selected === node ? 'files-file-on' : ''}`}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
          onClick={() => openFile(node)}
        >
          <span className='files-icon'>[ ]</span>
          {node.name}
        </button>
      </li>
    );
  }

  const path = selected ? findPath(DRIVE, selected)?.map((n) => n.name).join('\\') : null;

  return (
    <div className='files-app'>
      <div className='files-tree'>
        <ul>{renderNode(DRIVE, 0)}</ul>
      </div>
      <div className='files-view'>
        {!selected ? (
          <div className='files-empty'>
            <p>My Computer</p>
            <p className='files-tip'>Open a folder, then a file. Some of them are worth reading twice.</p>
          </div>
        ) : (
          <>
            <div className='files-view-head'>{path}</div>
            <pre className='files-body'>{selected.body?.join('\n')}</pre>
            {selected.open ? (
              <button className='files-open' onClick={() => onOpenBrowser(selected.open!)}>
                open {selected.open} on the net
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
