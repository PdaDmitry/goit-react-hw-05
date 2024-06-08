import { toast } from 'react-hot-toast';

export default function MoviesPage() {
  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    if (entryField === '') {
      toast.error('The form field must be filled in!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'orange',
          color: 'black',
        },
      });
      return;
    }

    // onSubmit(entryField);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="query" placeholder="Search movies..." />
          <button type="subnit">Search</button>
        </div>
      </form>
    </div>
  );
}
