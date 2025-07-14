import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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
    (argv) => {
      console.log(argv.content);
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
    async (argv) => {}
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
    async (argv) => {}
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
    async (argv) => {}
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
    async (argv) => {}
  )
  .command(
    'clean',
    'Remove all notes',
    () => {},
    async (argv) => {}
  )
  .demandCommand(1)
  .parse();
