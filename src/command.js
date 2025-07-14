import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNodes,
  removeNote,
} from './notes.js';
import { start } from './server.js';

const listNotes = (notes) => {
  notes.forEach((note) => {
    console.log('id: ', note.id);
    console.log('tags: ', note.tags.join(', '));
    console.log('content: ', note.content);
    console.log('\n');
  });
};

yargs(hideBin(process.argv))
  .command(
    'new <content>',
    'Create a new note',
    (yargs) => {
      return yargs.positional('note', {
        type: 'string',
        describe: 'The content of the note to create',
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(',') : [];
      const note = await newNote(argv.content, tags);
      console.log('New note created', note);
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    describe: 'Tags to add to the note',
  })
  .command(
    'all',
    'Get all notes',
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    'find <filter>',
    'Get matching notes',
    (yargs) => {
      return yargs.positional('filter', {
        type: 'string',
        describe:
          'The search term to filter notes by, will be applied to note.content',
      });
    },
    async (argv) => {
      const matches = await findNotes(argv.filter);
      listNotes(matches);
    }
  )
  .command(
    'remove <id>',
    'Remove note by id',
    (yargs) => {
      return yargs.positional('id', {
        type: 'number',
        describe: 'The id of the note you want to remove',
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log('Note removed with id: ', id);
    }
  )
  .command(
    'web [port]',
    'Launch website to see notes',
    (yargs) => {
      return yargs.positional('port', {
        type: 'number',
        describe: 'Port to bind on',
        default: 5000,
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    }
  )
  .command(
    'clean',
    'Remove all notes',
    () => {},
    async (argv) => {
      await removeAllNodes();
      console.log('All notes have been removed');
    }
  )
  .demandCommand(1)
  .parse();
