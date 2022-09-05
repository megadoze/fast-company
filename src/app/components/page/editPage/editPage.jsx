import { React } from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../../ui/editUserForm";
import PropTypes from "prop-types";

const EditPage = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4">Edit Page</h3>
                        <div>
                            <EditUserForm userId={userId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

EditPage.propTypes = {
    userId: PropTypes.string
};

export default EditPage;
