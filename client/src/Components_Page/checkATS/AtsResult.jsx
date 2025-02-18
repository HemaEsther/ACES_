import PropTypes from "prop-types";

const AtsResult = ({ results }) => {
  if (!results)
    return (
      <p className="text-gray-500 text-center italic">
        No results available. Upload your resume to get a score.
      </p>
    );

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800">Your ATS Score</h2>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-bold shadow-lg">
          {results.score}%
        </div>
      </div>

      {results.suggestions && results.suggestions.length > 0 && (
        <div className="mt-5 text-left">
          <h3 className="text-lg font-semibold text-gray-700">
            Suggestions to Improve:
          </h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            {results.suggestions.map((s, i) => (
              <li key={i} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ✅ Adding PropTypes validation
AtsResult.propTypes = {
  results: PropTypes.shape({
    score: PropTypes.number, // `score` should be a number
    suggestions: PropTypes.arrayOf(PropTypes.string), // `suggestions` should be an array of strings
  }),
};

export default AtsResult;
