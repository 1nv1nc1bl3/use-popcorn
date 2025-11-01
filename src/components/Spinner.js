import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100px auto',
};

export default function Spinner({ loading }) {
    return (
        <ClipLoader
            color='#fff'
            loading={loading}
            cssOverride={override}
            size={150}
        />
    );
}
