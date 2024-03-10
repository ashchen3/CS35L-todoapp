import { TextField, Autocomplete, Typography, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";

function SearchBar({ tasklistData }) {
  const navigate = useNavigate();

  return (
    <Autocomplete
      disablePortal
      fullWidth
      display="flex"
      id="tasklist-and-task-search"
      options={ reformatTasklistData(tasklistData) }
      getOptionLabel={ (option) => option.title }
      isOptionEqualToValue={ (option, value) => option.title.toLowerCase().includes(value.title.toLowerCase()) }
      groupBy={ (option) => option.type }

      // Redirects to list view upon clicking on any element
      onChange={(event, option) => {
        var tasklistId;
        if(option.type == 'Tasks') tasklistId = option.tasklist.id;
        else tasklistId = option.id;
        navigate('/list', { state: { selectedTasklistId: tasklistId } });
      }}

      renderInput={ renderSearchBarInput }
      renderOption={ renderSearchBarOption }
    />
   );
}

function reformatTasklistData(tasklistData){

  if (!tasklistData) return [];

  const tasklists = JSON.parse(JSON.stringify(tasklistData));  // Note that this cloning process converts Dates to strings
  tasklists.forEach((tasklist) => {
    delete tasklist.tasks;
    tasklist.type = 'Tasklists';
  });

  const tasks = [].concat(
    ...tasklistData.map((tasklist) => 
      tasklist.tasks.map((task) => {
        task['tasklist'] = {
          id: tasklist.id,
          title: tasklist.title
        }
        return task;
      })
    )
  ).map((task) => ({ ...task, type: 'Tasks' }));

  return [].concat(tasklists, tasks);
}

function renderSearchBarInput(params, tasklistData){
  return (<TextField {...params}
    label="Search your lists..."
    sx={{
     margin: '10px auto',
    }}
  />)
}

function renderSearchBarOption(props, option){
  const elements = [
    <Typography noWrap
      sx={{
        width: 250,
        pr: '1em',
      }}
    >
      {option.title}
    </Typography>
  ];

  if(option.type == 'Tasks'){
    elements.push(
      <Typography 
        noWrap
        color="#9e9e9e"
        sx={{
          width: 250,
        }}
      >
        In <i>{option.tasklist.title}</i>
      </Typography>
    );
  }
  
  return (<li {...props} key={option.id}>
    <Box key={"Box "+option.id}
      style={{
        display: "flex"
      }}
    >
      {elements}
    </Box>
  </li>);
}

export default SearchBar;

/* DEPRECATED SEARCHBAR
    <TextField
      label={"Search your lists..."}
      margin="normal"
      fullWidth={true}
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      onSubmit={(e) => e.preventDefault}
    />
*/

/* DEPRECATED SEARCH BAR FILTERING FUNCTION
function searchBarFilter(query, data){
  if (!query) return null;

  var searchResults = {};
  searchResults.tasklists = data.filter((tasklist) => tasklist.title.toLowerCase().includes(query.toLowerCase()));

  searchResults.tasks = [].concat(...data.map((tasklist) => 
    tasklist.tasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    )
  ));

  return searchResults;
}
*/
