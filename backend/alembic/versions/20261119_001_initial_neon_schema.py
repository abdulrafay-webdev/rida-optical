"""Initial Neon PostgreSQL Schema for Rida Optical

Revision ID: 001_initial_neon_schema
Revises: 
Create Date: 2026-11-19 16:10:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = '001_initial_neon_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. categories
    op.create_table(
        'categories',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column('parent_id', sa.Integer(), nullable=True),
        sa.Column('product_count', sa.Integer(), nullable=False),
        sa.Column('thumbnail_id', sa.Integer(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['parent_id'], ['categories.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_categories_name'), 'categories', ['name'], unique=False)
    op.create_index(op.f('ix_categories_slug'), 'categories', ['slug'], unique=True)
    op.create_index(op.f('ix_categories_parent_id'), 'categories', ['parent_id'], unique=False)

    # 2. media_assets
    op.create_table(
        'media_assets',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('file_path', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=False),
        sa.Column('original_url', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=False),
        sa.Column('imagekit_url', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=True),
        sa.Column('alt_text', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('mime_type', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('width', sa.Integer(), nullable=True),
        sa.Column('height', sa.Integer(), nullable=True),
        sa.Column('file_size_bytes', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # 3. lens_usage_types
    op.create_table(
        'lens_usage_types',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column('price_modifier_pkr', sa.Float(), nullable=False),
        sa.Column('is_default', sa.Boolean(), nullable=False),
        sa.Column('display_order', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_lens_usage_types_slug'), 'lens_usage_types', ['slug'], unique=True)

    # 4. lens_coatings
    op.create_table(
        'lens_coatings',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('category', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('price_pkr', sa.Float(), nullable=False),
        sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column('display_order', sa.Integer(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_lens_coatings_category'), 'lens_coatings', ['category'], unique=False)
    op.create_index(op.f('ix_lens_coatings_slug'), 'lens_coatings', ['slug'], unique=True)

    # 5. products
    op.create_table(
        'products',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('sku', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('base_price_pkr', sa.Float(), nullable=False),
        sa.Column('regular_price_pkr', sa.Float(), nullable=True),
        sa.Column('sale_price_pkr', sa.Float(), nullable=True),
        sa.Column('stock_status', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('is_featured', sa.Boolean(), nullable=False),
        sa.Column('total_sales', sa.Integer(), nullable=False),
        sa.Column('short_description', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('has_prescription_support', sa.Boolean(), nullable=False),
        sa.Column('primary_image_id', sa.Integer(), nullable=True),
        sa.Column('meta_title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True),
        sa.Column('meta_description', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=True),
        sa.Column('canonical_url', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=True),
        sa.ForeignKeyConstraint(['primary_image_id'], ['media_assets.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_products_title'), 'products', ['title'], unique=False)
    op.create_index(op.f('ix_products_slug'), 'products', ['slug'], unique=True)
    op.create_index(op.f('ix_products_sku'), 'products', ['sku'], unique=True)
    op.create_index(op.f('ix_products_base_price_pkr'), 'products', ['base_price_pkr'], unique=False)
    op.create_index(op.f('ix_products_stock_status'), 'products', ['stock_status'], unique=False)
    op.create_index(op.f('ix_products_is_featured'), 'products', ['is_featured'], unique=False)
    op.create_index(op.f('ix_products_has_prescription_support'), 'products', ['has_prescription_support'], unique=False)

    # 6. product_variations
    op.create_table(
        'product_variations',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('sku', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('color_name', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('color_slug', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('color_hex', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('size', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('price_pkr', sa.Float(), nullable=False),
        sa.Column('regular_price_pkr', sa.Float(), nullable=True),
        sa.Column('sale_price_pkr', sa.Float(), nullable=True),
        sa.Column('stock_status', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('image_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['image_id'], ['media_assets.id']),
        sa.ForeignKeyConstraint(['product_id'], ['products.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_product_variations_product_id'), 'product_variations', ['product_id'], unique=False)
    op.create_index(op.f('ix_product_variations_sku'), 'product_variations', ['sku'], unique=True)
    op.create_index(op.f('ix_product_variations_color_name'), 'product_variations', ['color_name'], unique=False)

    # 7. product_category_links
    op.create_table(
        'product_category_links',
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('category_id', sa.Integer(), nullable=False),
        sa.Column('is_primary', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['category_id'], ['categories.id']),
        sa.ForeignKeyConstraint(['product_id'], ['products.id']),
        sa.PrimaryKeyConstraint('product_id', 'category_id')
    )

    # 8. product_image_links
    op.create_table(
        'product_image_links',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('media_asset_id', sa.Integer(), nullable=False),
        sa.Column('is_primary', sa.Boolean(), nullable=False),
        sa.Column('display_order', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['media_asset_id'], ['media_assets.id']),
        sa.ForeignKeyConstraint(['product_id'], ['products.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_product_image_links_product_id'), 'product_image_links', ['product_id'], unique=False)
    op.create_index(op.f('ix_product_image_links_media_asset_id'), 'product_image_links', ['media_asset_id'], unique=False)

    # 9. customers
    op.create_table(
        'customers',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('full_name', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('phone', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('alternate_phone', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True),
        sa.Column('email', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=True),
        sa.Column('address', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=False),
        sa.Column('city', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('postal_code', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_customers_full_name'), 'customers', ['full_name'], unique=False)
    op.create_index(op.f('ix_customers_phone'), 'customers', ['phone'], unique=False)
    op.create_index(op.f('ix_customers_city'), 'customers', ['city'], unique=False)
    op.create_index(op.f('ix_customers_email'), 'customers', ['email'], unique=False)

    # 10. orders
    op.create_table(
        'orders',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('order_number', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.Column('status', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('payment_method', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('payment_status', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.Column('subtotal_pkr', sa.Float(), nullable=False),
        sa.Column('shipping_fee_pkr', sa.Float(), nullable=False),
        sa.Column('discount_pkr', sa.Float(), nullable=False),
        sa.Column('total_amount_pkr', sa.Float(), nullable=False),
        sa.Column('shipping_address', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=False),
        sa.Column('shipping_city', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('order_notes', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column('tracking_number', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=True),
        sa.Column('courier_name', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=True),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_orders_order_number'), 'orders', ['order_number'], unique=True)
    op.create_index(op.f('ix_orders_customer_id'), 'orders', ['customer_id'], unique=False)
    op.create_index(op.f('ix_orders_status'), 'orders', ['status'], unique=False)

    # 11. order_items
    op.create_table(
        'order_items',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('order_id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('variation_id', sa.Integer(), nullable=True),
        sa.Column('product_title', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('variation_title', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=True),
        sa.Column('unit_frame_price', sa.Float(), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('line_total', sa.Float(), nullable=False),
        sa.Column('has_prescription', sa.Boolean(), nullable=False),
        sa.Column('lens_usage_id', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True),
        sa.Column('lens_coating_id', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True),
        sa.Column('optical_surcharge', sa.Float(), nullable=False),
        sa.Column('prescription_text', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column('prescription_file_url', sqlmodel.sql.sqltypes.AutoString(length=500), nullable=True),
        sa.Column('pd_measurement', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('sph_od', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('cyl_od', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('axis_od', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('sph_os', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('cyl_os', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.Column('axis_os', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=True),
        sa.ForeignKeyConstraint(['lens_coating_id'], ['lens_coatings.id']),
        sa.ForeignKeyConstraint(['lens_usage_id'], ['lens_usage_types.id']),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id']),
        sa.ForeignKeyConstraint(['product_id'], ['products.id']),
        sa.ForeignKeyConstraint(['variation_id'], ['product_variations.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_order_items_order_id'), 'order_items', ['order_id'], unique=False)
    op.create_index(op.f('ix_order_items_product_id'), 'order_items', ['product_id'], unique=False)


    # 12. users (Admin & Customer Authentication)
    op.create_table(
        'users',
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('hashed_password', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('full_name', sqlmodel.sql.sqltypes.AutoString(length=150), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('is_superuser', sa.Boolean(), nullable=False),
        sa.Column('role', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)


def downgrade() -> None:
    op.drop_table('users')
    op.drop_table('order_items')
    op.drop_table('orders')
    op.drop_table('customers')
    op.drop_table('product_image_links')
    op.drop_table('product_category_links')
    op.drop_table('product_variations')
    op.drop_table('products')
    op.drop_table('lens_coatings')
    op.drop_table('lens_usage_types')
    op.drop_table('media_assets')
    op.drop_table('categories')
