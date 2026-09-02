const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

// Replace newEvent state
content = content.replace(
  "const [newEvent, setNewEvent] = useState({ title: '', date: '', snippet: '', details: '', location: '', deadline: '' });",
  "const [newEvent, setNewEvent] = useState({ title: '', image: '', snippet: '', details: '', location: '', deadline: '' });"
);

// Replace handleAddEvent payload
const oldHandleAddEvent = const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titre: newEvent.title,
        description: newEvent.snippet,
        details: newEvent.details,
        date: newEvent.date,
        lieu: newEvent.location,
        deadline: newEvent.deadline || null
      };
      const res = await api.post('/events/', payload);
      setEvents([...events, res.data]);
      setNewEvent({ title: '', date: '', snippet: '', details: '', location: '', deadline: '' });;

const newHandleAddEvent = const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titre: newEvent.title,
        description: newEvent.snippet,
        details: newEvent.details,
        photo_url: newEvent.image,
        lieu: newEvent.location,
        deadline: newEvent.deadline || null,
        uuid: uuidv4()
      };
      const res = await api.post('/events/', payload);
      setEvents([res.data, ...events]);
      setNewEvent({ title: '', image: '', snippet: '', details: '', location: '', deadline: '' });;

content = content.replace(oldHandleAddEvent, newHandleAddEvent);

// Also add a delete button next to the event in the events list
const oldEventItem = className="text-on-surface-variant hover:text-[#9D4EDD] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                </div>;

const newEventItem = className="text-on-surface-variant hover:text-[#9D4EDD] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this event?")) {
                          handleDeleteEvent(ev.id);
                        }
                      }}
                      className="text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>;

content = content.replace(oldEventItem, newEventItem);

fs.writeFileSync('src/pages/Admin.jsx', content, 'utf8');
