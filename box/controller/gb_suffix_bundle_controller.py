# _*_ coding: utf-8 _*_
from box import geobox, db
from flask import jsonify
from box.model.gb_suffix_bundle_do import GbSuffixBundle, GbSuffixBundleSchema

_BASE_URL = '/suffix'


@geobox.route(_BASE_URL + '/id/<row_id>')
def get_suffix_bundle_by_id(row_id):
    suffix_record = GbSuffixBundle.query.filter_by(bundle_id=row_id).first()
    suffix_schema = GbSuffixBundleSchema()
    return jsonify(suffix_schema.dump(suffix_record).data)


@geobox.route(_BASE_URL + '/all')
def list_all_suffix_bundle():
    all_suffix = GbSuffixBundle.query.all()
    suffix_schema = GbSuffixBundleSchema()
    print '===after'
    print all_suffix[0]
    # return all_suffix[0].suffix_details
    # return jsonify(suffix_schema.dump(all_suffix).data)
    return suffix_schema.jsonify(all_suffix, many=True)


def save_obj_suffix_bundle(bundle_obj):
    db.session.add(bundle_obj)
    db.session.commit()


@geobox.route(_BASE_URL + '/add/<suffix_details>')
def save_suffix_bundle(suffix_details):
    print 'add01'
    bundle = GbSuffixBundle('id002', 'type002', 'topojson', suffix_details)
    print 'add02'
    save_obj_suffix_bundle(bundle)


@geobox.route(_BASE_URL + '/update/id/<row_id>')
def update_by_id(row_id):
    record = GbSuffixBundle.query.filter_by(bundle_id=row_id).first()
    record.type_id = 'type009'
    record.file_suffix = 'jpeg'
    db.session.add(record)
    db.session.commit()


@geobox.route(_BASE_URL + '/remove/id/<suffix_id>')
def remove_suffix_bundle_by_id(suffix_id):
    to_remove_obj = GbSuffixBundle.query.filter_by(bundle_id=suffix_id).first()
    print to_remove_obj.suffix_details
    db.session.delete(to_remove_obj)
    db.session.commit()
