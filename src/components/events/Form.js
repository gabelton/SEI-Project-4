import React from 'react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'



const Form = ({ handleSelect, handleArtistSelect, artistOptions, handleChange, handleSubmit, data, errors, options}) => {

  console.log(data.name)
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="formBox">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Exhibition Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  placeholder="eg: Pierre Bonnard: The Colour of Memory"
                  onChange={handleChange}
                  value={data.name || ''}
                />
              </div>
              {errors.name && <div className="help is-danger">{errors.name}</div>}
            </div>
            <div className="field">
              <label className="label">Start Date</label>
              <div className="control">
                <input
                  className="input"
                  name="start_date"
                  placeholder="eg: 05/03/19"
                  onChange={handleChange}
                  value={data.start_date || ''}
                />
              </div>
              {errors.start_date && <div className="help is-danger">{errors.start_date}</div>}
            </div>
            <div className="field">
              <label className="label">End Date</label>
              <div className="control">
                <input
                  className="input"
                  name="end_date"
                  placeholder="eg: 05/05/19"
                  onChange={handleChange}
                  value={data.end_date || ''}
                />
              </div>
              {errors.end_date && <div className="help is-danger">{errors.end_date}</div>}
            </div>
            <div className="field">
              <label className="label">Venue</label>
              <div className="control">
                <input
                  className="input"
                  name="venue"
                  placeholder="eg: Tate Modern"
                  onChange={handleChange}
                  value={data.venue || ''}
                />
              </div>
              {errors.venue && <div className="help is-danger">{errors.venue}</div>}
            </div>
            <div className="field">
              <label className="label">Area</label>
              <div className="control">
                <input
                  className="input"
                  name="area"
                  placeholder="eg: Central"
                  onChange={handleChange}
                  value={data.area || ''}
                />
              </div>
              {errors.area && <div className="help is-danger">{errors.area}</div>}
            </div>
            <div className="field">
              <label className="label">Entry Fee</label>
              <div className="control">
                <input
                  className="input"
                  name="entry_fee"
                  type="number"
                  placeholder="eg: 15"
                  onChange={handleChange}
                  value={data.entry_fee || ''}
                />
              </div>
              {errors.entry_fee && <div className="help is-danger">{errors.entry_fee}</div>}
            </div>
            <div className="field">
              <label className="label">Image (optional)</label>
              <div className="control">
                <input
                  className="input"
                  name="image"
                  placeholder="eg: https://www.tate.org.uk/sites/default/files/styles/width-420/public/le_jardin_v.2_1.jpg"
                  onChange={handleChange}
                  value={data.image || ''}
                />
              </div>
              {errors.image && <div className="help is-danger">{errors.image}</div>}
            </div>
            <div className="field">
              <label className="label">Artist(s)</label>
              <div className="control">
                <Select
                  name="keywords"
                  options={artistOptions}
                  isMulti
                  onChange={handleArtistSelect}
                />
              </div>
              {errors.artists && <div className="help is-danger">{errors.artists}</div>}
            </div>
            <div className="field">
              <label className="label">Keywords</label>
              <div className="control">
                <Select
                  name="keywords"
                  options={options}
                  isMulti
                  onChange={handleSelect}
                />
              </div>
              {errors.keywords && <div className="help is-danger">{errors.keywords}</div>}
            </div>
            <button className="button is-dark">Submit</button>
          </form>
        </div>

      </div>
    </section>



  )
}


export default withRouter(Form)
